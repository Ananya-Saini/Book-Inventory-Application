using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CreateBookDto
{
    [Required(ErrorMessage = "Title is Required")]
    [StringLength(200, ErrorMessage = "Title cannot exceed 200 chars.")]
    public string Title {get; set;} = string.Empty;

    [Required(ErrorMessage = "Author is required.")]
    [StringLength(100, ErrorMessage = "Author cannot exceed 100 characters.")]
    public string Author { get; set; } = string.Empty;

    [Required(ErrorMessage = "Genre is required.")]
    [StringLength(50, ErrorMessage = "Genre cannot exceed 50 characters.")]
    public string Genre { get; set; } = string.Empty;

    [Required(ErrorMessage = "ISBN is required.")]
    [StringLength(20, ErrorMessage = "ISBN cannot exceed 20 characters.")]
    public string Isbn { get; set; } = string.Empty;

    [Range(0.01, 10000.00, ErrorMessage = "Price must be between 0.01 and 10,000.00.")]
    public decimal Price { get; set; }

    [Range(0, 100000, ErrorMessage = "Stock quantity must be a non-negative integer.")]
    public int StockQuantity { get; set; }

    [Required(ErrorMessage = "Published date is required.")]
    public DateTime PublishedDate { get; set; }
}

public class BookResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public string Isbn { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public DateTime PublishedDate { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class BookQueryParameters
{
    private int _pageSize = 10;
    private const int MaxPageSize = 50;
    public int PageNumber {get; set;} = 1;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : (value < 1 ? 10 : value);
    }
    public string? SearchTerm {get; set;}
    public string? Genre { get; set; }
    public string? Author { get; set; }
    public string? SortBy { get; set; }
}

public class PagedResult<T>
{
    public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasNext => PageNumber < TotalPages;
    public bool HasPrevious => PageNumber > 1;

    public PagedResult() { }

    public PagedResult(IEnumerable<T> items, int totalCount, int pageNumber, int pageSize)
    {
        Items = items;
        TotalCount = totalCount;
        PageNumber = pageNumber;
        PageSize = pageSize;
    }
}