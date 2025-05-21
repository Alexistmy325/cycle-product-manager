using Microsoft.EntityFrameworkCore;
using PruebaTecnicaCycle.Domain.Entities;

namespace PruebaTecnicaCycle.Infrastructure.Data
{
    public class CatalogoContext : DbContext
    {
        public CatalogoContext(DbContextOptions<CatalogoContext> options)
            : base(options)
        {
        }

        // Inicializado con null! para cumplir con nullable reference types
        public DbSet<Product> Products { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Productos", schema: "Catalogo");
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Nombre)
                      .IsRequired()
                      .HasMaxLength(150);

                entity.Property(p => p.Precio)
                      .IsRequired()
                      .HasColumnType("numeric(10,2)");

                entity.Property(p => p.Categoria)
                      .HasMaxLength(150);

                entity.Property(p => p.Descripcion)
                      .HasMaxLength(500);

                entity.Property(p => p.Imagen)
                      .HasColumnType("varchar(max)");

                entity.Property(p => p.Estado)
                      .IsRequired();
            });
        }
    }
}
