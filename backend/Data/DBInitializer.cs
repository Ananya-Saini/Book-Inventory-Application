namespace backend.Data;

using backend.Modals.Book;

public class DBinitializer
{
    public static void Seed(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();

        if(context.Books.Any())
        {
            return; // Database has been seeded
        }

        var sampleBooks = new List<Book>
        {
            new Book
            {
                Title = "Clean Code: A Handbook of Agile Software Craftsmanship",
                Author = "Robert C. Martin",
                Genre = "Technology",
                Isbn = "978-0132350884",
                Price = 42.99m,
                StockQuantity = 25,
                PublishedDate = new DateTime(2008, 8, 1),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "Designing Data-Intensive Applications",
                Author = "Martin Kleppmann",
                Genre = "Technology",
                Isbn = "978-1449373320",
                Price = 49.99m,
                StockQuantity = 18,
                PublishedDate = new DateTime(2017, 3, 16),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "Dune",
                Author = "Frank Herbert",
                Genre = "Sci-Fi",
                Isbn = "978-0441172719",
                Price = 16.99m,
                StockQuantity = 45,
                PublishedDate = new DateTime(1965, 8, 1),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "The Pragmatic Programmer",
                Author = "Andrew Hunt & David Thomas",
                Genre = "Technology",
                Isbn = "978-0201616224",
                Price = 47.95m,
                StockQuantity = 12,
                PublishedDate = new DateTime(1999, 10, 30),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "Atomic Habits",
                Author = "James Clear",
                Genre = "Self-Help",
                Isbn = "978-0735211292",
                Price = 18.00m,
                StockQuantity = 60,
                PublishedDate = new DateTime(2018, 10, 16),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "Project Hail Mary",
                Author = "Andy Weir",
                Genre = "Sci-Fi",
                Isbn = "978-0593135204",
                Price = 22.50m,
                StockQuantity = 30,
                PublishedDate = new DateTime(2021, 5, 4),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "Zero to One",
                Author = "Peter Thiel",
                Genre = "Business",
                Isbn = "978-0804139298",
                Price = 24.00m,
                StockQuantity = 8,
                PublishedDate = new DateTime(2014, 9, 16),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "The Great Gatsby",
                Author = "F. Scott Fitzgerald",
                Genre = "Fiction",
                Isbn = "978-0743273565",
                Price = 11.99m,
                StockQuantity = 50,
                PublishedDate = new DateTime(1925, 4, 10),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "C# 12 and .NET 8 – Modern Cross-Platform Development",
                Author = "Mark J. Price",
                Genre = "Technology",
                Isbn = "978-1837635870",
                Price = 54.99m,
                StockQuantity = 15,
                PublishedDate = new DateTime(2023, 11, 14),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "To Kill a Mockingbird",
                Author = "Harper Lee",
                Genre = "Fiction",
                Isbn = "978-0061120084",
                Price = 14.99m,
                StockQuantity = 35,
                PublishedDate = new DateTime(1960, 7, 11),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "1984",
                Author = "George Orwell",
                Genre = "Fiction",
                Isbn = "978-0451524935",
                Price = 12.50m,
                StockQuantity = 40,
                PublishedDate = new DateTime(1949, 6, 8),
                CreatedAt = DateTime.UtcNow
            },
            new Book
            {
                Title = "Sapiens: A Brief History of Humankind",
                Author = "Yuval Noah Harari",
                Genre = "History",
                Isbn = "978-0062316097",
                Price = 21.99m,
                StockQuantity = 22,
                PublishedDate = new DateTime(2014, 9, 4),
                CreatedAt = DateTime.UtcNow
            }
        };

        context.Books.AddRange(sampleBooks);
        context.SaveChanges();
    }
}