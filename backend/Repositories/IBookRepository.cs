using backend.Modals.Book;

namespace backend.Repositories;

public interface IBookRepository
{
    IQueryable<Book> GetQueryable();
    Task<Book?> GetByIdAsync(int id);
    Task<Book> AddAsync(Book book);
    Task<bool> UpdateAsync(Book book);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsByIsbnAsync(string isbn, int? excludeId = null);
}