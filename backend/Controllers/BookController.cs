namespace backend.Controllers;

using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<BookResponseDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<BookResponseDto>>> GetBooks([FromQuery] BookQueryParameters queryParameters)
    {
        if(queryParameters.PageNumber < 1 || queryParameters.PageSize < 1)
        {
            return BadRequest(new ProblemDetails{
                Status = 400,
                Title = "Invalid pagination parameters",
                Detail = "PageNumber and PageSize must be greater than 0."
            });
        }
        var result = await _bookService.GetBooks(queryParameters);
        return Ok(result.Value);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(BookResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<BookResponseDto>> GetBookById(int id)
    {
        var book = await _bookService.GetByIdAsync(id);
        if (book == null)
        {
            return NotFound(new ProblemDetails
            {
                Status = 404,
                Title = "Not Found",
                Detail = $"Book with ID {id} was not found."
            });
        }
        return Ok(book);
    }

    [HttpPost]
    public async Task<ActionResult<BookResponseDto>> CreateBook([FromBody] CreateBookDto bookDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (await _bookService.ExistsByIsbnAsync(bookDto.Isbn))
        {
            return Conflict(new ProblemDetails
            {
                Status = 409,
                Title = "Conflict",
                Detail = $"A book with ISBN '{bookDto.Isbn}' already exists in inventory.",
                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.8"
            });
        }

        var createdBook = await _bookService.AddAsync(bookDto);
        return CreatedAtAction(nameof(GetBookById), new { id = createdBook.Id }, createdBook);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BookResponseDto>> UpdateBook(int id, [FromBody] UpdateBookDto bookDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updated = await _bookService.UpdateAsync(id, bookDto);
        if (!updated)
        {
            return NotFound(new ProblemDetails
            {
                Status = 404,
                Title = "Not Found",
                Detail = $"Book with ID {id} was not found."
            });
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var result = await _bookService.DeleteAsync(id);
        if (!result)
        {
            return NotFound();
        }
        return NoContent();
    }
}