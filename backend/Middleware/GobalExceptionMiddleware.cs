using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Middleware;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate next;
    private readonly ILogger<GlobalExceptionMiddleware> logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        this.next = next;
        this.logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception err)
        {
            logger.LogError(err, "An unhandled exception occured: {Message}", err.Message);
            await HandleExceptionAsync(context, err);
        }
    }

    public static Task HandleExceptionAsync(HttpContext context, Exception err)
    {
        context.Response.ContentType = "application/problem+json";

        var problemDetails = new ProblemDetails
        {
            Instance = context.Request.Path
        };

        if (err is DbUpdateException dbEx && dbEx.InnerException != null && 
            (dbEx.InnerException.Message.Contains("UNIQUE constraint failed") ||
             dbEx.InnerException.Message.Contains("duplicate key") ||
             dbEx.InnerException.Message.Contains("Isbn")))
        {
            context.Response.StatusCode = (int)HttpStatusCode.Conflict;
            problemDetails.Title = "Conflict / Duplicate Resource";
            problemDetails.Detail = "A book with the specified ISBN already exists in the inventory.";
            problemDetails.Type = "https://tools.ietf.org/html/rfc7231#section-6.5.8";
        }
        else
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            problemDetails.Status = (int)HttpStatusCode.InternalServerError;
            problemDetails.Title = "An error occurred while processing your request.";
            problemDetails.Detail = err.Message;
            problemDetails.Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1";
        }

        var result = JsonSerializer.Serialize(problemDetails);
        return context.Response.WriteAsync(result);
    }
}