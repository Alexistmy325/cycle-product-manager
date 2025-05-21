using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaCycle.Infrastructure.Data;
using System.Data;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// 1. Servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 1.a CORS: permitimos al cliente Angular acceder a nuestra API
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "PruebaTecnicaCycle API", 
        Version = "v1" 
    });

    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "Master Key en el header X-Master-Key",
        Name = "X-Master-Key",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "ApiKeyScheme"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference 
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "ApiKey"
                }
            },
            Array.Empty<string>()
        }
    });
});

// —— Aquí añadimos EF Core y Dapper ——

// Cadena de conexión
var connection = builder.Configuration.GetConnectionString("DefaultConnection");

// Registrar EF Core DbContext
#pragma warning disable CS0436 // Type conflicts with imported type
builder.Services.AddDbContext<CatalogoContext>(options =>
    options.UseSqlServer(connection));
#pragma warning restore CS0436 // Type conflicts with imported type

// Registrar Dapper IDbConnection
builder.Services.AddScoped<IDbConnection>(sp =>
    new SqlConnection(connection));

var app = builder.Build();

// 1) CORS (antes de usar middlewares que atiendan peticiones)
app.UseCors();

// 2) Exponer Swagger *sin* validación
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    c.RoutePrefix = "swagger";
});

// 3) Middleware de Master Key para TODO lo demás
app.Use(async (ctx, next) =>
{
    if (!ctx.Request.Headers.TryGetValue("X-Master-Key", out var key)
        || key != builder.Configuration["MasterKey"])
    {
        ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await ctx.Response.WriteAsync("X-Master-Key inválida");
        return;
    }
    await next();
});

app.MapControllers();

app.Run();
