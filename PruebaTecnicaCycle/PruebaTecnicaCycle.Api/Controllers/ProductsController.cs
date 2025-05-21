using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using PruebaTecnicaCycle.Api.Models;
using PruebaTecnicaCycle.Domain.Entities;
using PruebaTecnicaCycle.Infrastructure.Data;
using System.Data;
using Dapper;

namespace PruebaTecnicaCycle.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly CatalogoContext _ctx;
        private readonly IDbConnection _db;

        public ProductsController(CatalogoContext ctx, IDbConnection db)
        {
            _ctx = ctx;
            _db = db;
        }

        // GET /Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            var products = await _ctx.Products.ToListAsync();
            return Ok(products);
        }

        // GET /Products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _ctx.Products.FindAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        // POST /Products
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] ProductCreateDto dto)
        {
            // Convertir la imagen a Base64
            string base64Img;
            await using (var ms = new MemoryStream())
            {
                await dto.ImagenFile.CopyToAsync(ms);
                base64Img = Convert.ToBase64String(ms.ToArray());
            }

            var product = new Product
            {
                Nombre      = dto.Nombre,
                Precio      = dto.Precio,
                Categoria   = dto.Categoria,
                Descripcion = dto.Descripcion,
                Imagen      = base64Img,
                Estado      = dto.Estado
            };

            _ctx.Products.Add(product);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        // PUT /Products/{id}
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] ProductUpdateDto dto)
        {
            var product = await _ctx.Products.FindAsync(id);
            if (product == null) return NotFound();

            product.Nombre      = dto.Nombre;
            product.Precio      = dto.Precio;
            product.Categoria   = dto.Categoria;
            product.Descripcion = dto.Descripcion;
            product.Estado      = dto.Estado;

            if (dto.ImagenFile != null)
            {
                await using var ms = new MemoryStream();
                await dto.ImagenFile.CopyToAsync(ms);
                product.Imagen = Convert.ToBase64String(ms.ToArray());
            }

            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        // DELETE /Products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _ctx.Products.FindAsync(id);
            if (product == null) return NotFound();

            _ctx.Products.Remove(product);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}
