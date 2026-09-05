using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Modals.Book;

public class Book
{
    public int Id {get; set;}

    [Required]
    [MaxLength(200)]
    public string Title {get; set;} = string.Empty; 

    [Required]
    [MaxLength(200)]
    public string Author {get; set;} = string.Empty; 

    [Required]
    [MaxLength(50)]
    public string Genre {get; set;} = string.Empty; 

    [Required]
    [MaxLength(20)]
    public string Isbn {get; set;} = string.Empty; 

    [Column (TypeName = "decimal(18, 2)")]
    public decimal Price {get; set;} 

    public int StockQuantity {get; set;}

    public DateTime PublishedDate {get; set;}

    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
}