using backend.Modals.Book;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services;

public interface IBookService
{
    Task<ActionResult<PagedResult<BookResponseDto>>> GetBooks(BookQueryParameters queryParameters);
    Task<Book?> GetByIdAsync(int id);
    Task<BookResponseDto> AddAsync(CreateBookDto dto);
    Task<bool> UpdateAsync(int id, UpdateBookDto dto);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsByIsbnAsync(string isbn, int? excludeId = null);
}