namespace PruebaTecnicaCycle.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal Precio { get; set; }
        public string? Categoria { get; set; }
        public string? Descripcion { get; set; }
        public string? Imagen { get; set; }  // Base64 o URL
        public bool Estado { get; set; }
    }
}
