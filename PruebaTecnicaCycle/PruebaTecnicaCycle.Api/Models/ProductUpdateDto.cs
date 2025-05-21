using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaCycle.Api.Models
{
    public class ProductUpdateDto
    {
        [Required]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public decimal Precio { get; set; }

        public string Categoria { get; set; } = string.Empty;

        public string Descripcion { get; set; } = string.Empty;

        // Opcional: si no envías archivo, no se actualiza la imagen
        public IFormFile? ImagenFile { get; set; }

        [Required]
        public bool Estado { get; set; }
    }
}
