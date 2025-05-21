export interface Product {
  id: number;
  nombre: string;
  precio: number;
  categoria?: string;
  descripcion?: string;
  imagen?: string;    // base64 o URL
  estado: boolean;
}

export interface ProductCreateDto {
  nombre: string;
  precio: number;
  categoria?: string;
  descripcion?: string;
  estado: boolean;
  imagenFile?: File;
}

export interface ProductUpdateDto extends ProductCreateDto {}
