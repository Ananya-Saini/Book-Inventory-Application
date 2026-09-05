using backend.Modals.Book;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementation;

public class BookRepository : IBookRepository
{
    private readonly ApplicationDbContext _context;

    public BookRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public IQueryable<Book> GetQueryable()
    {
        return _context.Books.AsQueryable();
    }

    public async Task<Book?> GetByIdAsync(int id)
    {
        return await _context.Books.FindAsync(id);
    }

    public async Task<Book> AddAsync(Book book)
    {
        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
        return book;
    }

    public async Task<bool> UpdateAsync(Book book)
    {
        _context.Books.Update(book);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return false;
        }
        _context.Books.Remove(book);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> ExistsByIsbnAsync(string isbn, int? excludeId = null)
    {
        var query = _context.Books.AsNoTracking().Where(b => b.Isbn == isbn);
        if (excludeId.HasValue)
        {
            query = query.Where(b => b.Id != excludeId.Value);
        }
        return await query.AnyAsync();
    }
}