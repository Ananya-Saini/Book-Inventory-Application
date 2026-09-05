namespace backend.Data;

using backend.Modals.Book;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}
    public DbSet<Book> Books => Set<Book>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(b => b.Id);

            entity.Property(b => b.Title).IsRequired().HasMaxLength(200);
            entity.Property(b => b.Author).IsRequired().HasMaxLength(200);
            entity.Property(b => b.Genre).IsRequired().HasMaxLength(50);
            entity.Property(b => b.Isbn).IsRequired().HasMaxLength(20);
            entity.HasIndex(b => b.Isbn).IsUnique();
            entity.Property(b => b.Price).HasPrecision(18, 2);
        });
    }
}