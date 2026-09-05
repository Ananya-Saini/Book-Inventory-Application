using backend.Modals.Book;
using backend.Repositories;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Implementation;

public class BookService : IBookService
{
    private readonly IBookRepository _bookRepository;

    public BookService(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    public async Task<ActionResult<PagedResult<BookResponseDto>>> GetBooks(BookQueryParameters query)
    {
        var queryable = _bookRepository.GetQueryable();

        if (!string.IsNullOrWhiteSpace(query.Genre))
        {
            var genreLower = query.Genre.ToLower();
            queryable = queryable.Where(b => b.Genre.ToLower() == genreLower);
        }

        if(!string.IsNullOrWhiteSpace(query.Author))
        {
            var authorLower = query.Author.ToLower();
            queryable = queryable.Where(b => b.Author.ToLower().Contains(authorLower));
        }

        if (!string.IsNullOrWhiteSpace(query.SearchTerm))
        {
            var searchTermLower = query.SearchTerm.ToLower();
            queryable = queryable.Where(b => b.Title.ToLower().Contains(searchTermLower) || b.Isbn.ToLower().Contains(searchTermLower));
        }

        queryable = query.SortBy?.ToLower() switch
        {
            "title" => queryable.OrderBy(b => b.Title),
            "title_desc" => queryable.OrderByDescending(b => b.Title),
            "author" => queryable.OrderBy(b => b.Author),
            "author_desc" => queryable.OrderByDescending(b => b.Author),
            "publishedDate" => queryable.OrderBy(b => b.PublishedDate),
            "publishedDate_desc" => queryable.OrderByDescending(b => b.PublishedDate),
            _ => queryable.OrderBy(b => b.Id)
        };

        var totalItems = await queryable.CountAsync();

        var items = await queryable
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(b => new BookResponseDto
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                Genre = b.Genre,
                Isbn = b.Isbn,
                Price = b.Price,
                StockQuantity = b.StockQuantity,
                PublishedDate = b.PublishedDate,
                CreatedAt = b.CreatedAt
            })
            .ToListAsync();

        var pagedResult = new PagedResult<BookResponseDto>(items, totalItems, query.PageNumber, query.PageSize);
        return pagedResult;
    }

    public async Task<Book?> GetByIdAsync(int id)
    {
        return await _bookRepository.GetByIdAsync(id);
    }

    public async Task<Book> AddAsync(Book book)
    {
        return await _bookRepository.AddAsync(book);
    }

    public async Task<bool> UpdateAsync(Book book)
    {
        return await _bookRepository.UpdateAsync(book);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _bookRepository.DeleteAsync(id);
    }

    public async Task<bool> ExistsByIsbnAsync(string isbn, int? excludeId = null)
    {
        return await _bookRepository.ExistsByIsbnAsync(isbn, excludeId);
    }
}