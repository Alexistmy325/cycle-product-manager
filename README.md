# cycle-product-manager

**Administración de Productos**  
Cliente Angular + Web API (.NET 6) usando Onion Architecture y CQRS.

---

## 📂 Estructura del repositorio

```text
cycle-product-manager/
├─ client/                   # Frontend Angular
│  ├─ src/
│  └─ package.json
├─ PruebaTecnicaCycle/       # Backend .NET 6 (Onion Arch.)
│  ├─ PruebaTecnicaCycle.Api/
│  ├─ PruebaTecnicaCycle.Application/
│  ├─ PruebaTecnicaCycle.Domain/
│  └─ PruebaTecnicaCycle.Infrastructure/
├─ .gitignore
└─ package.json              # Scripts raiz (monorepo)

Onion Architecture

Api – Exposición REST, inyección de dependencias.

Application – Casos de uso, DTOs, CQRS (MediatR).

Domain – Entidades, lógica de negocio pura.

Infrastructure – EF Core (commands), Dapper (queries), persistencia.

SOLID y Inyección de Dependencias

CQRS:

Commands → crear/editar/eliminar (Entity Framework).

Queries → leer (Dapper).

TECNOLOGIAS 

Frontend:

Angular 15+, PrimeNG, RxJS

Backend:

.NET 6, MediatR, EntityFramework Core, Dapper

 Instalación
Clona el repositorio y entra en la carpeta raíz:

git clone https://github.com/Alexistmy325/cycle-product-manager.git
cd cycle-product-manager

Luego instala dependencias y levanta ambos proyectos simultáneamente:

npm install
npm run start

ng serve del frontend en http://localhost:4200

dotnet run del backend en https://localhost:7120

scrips disponibles

en la raiz
npm run client    # instala y arranca sólo el frontend
npm run api       # restaura y arranca sólo la Web API
npm run start     # arranca ambos con concurrently

dentro de /client

npm install
npm run start


dentro de /PruebaTecnicaCycle
cd PruebaTecnicaCycle
dotnet restore
dotnet run --project PruebaTecnicaCycle.Api

## Base de datos

Este proyecto utiliza SQL Server y EF Core.

### Opción A: Migraciones EF Core

1. En la raíz del API:

   ```bash
   cd PruebaTecnicaCycle
   dotnet ef database update --project PruebaTecnicaCycle.Infrastructure

