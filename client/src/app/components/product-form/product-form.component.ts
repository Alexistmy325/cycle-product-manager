import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  productId?: number;
  previewImg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      categoria: [''],
      descripcion: [''],
      estado: [true, Validators.required],
      imagenFile: [null]
    });
    this.productId = this.config.data?.id;
  }

  ngOnInit(): void {
    if (this.productId != null) {
      this.loading = true;
      this.productService.getById(this.productId).subscribe(product => {
        this.form.patchValue({
          nombre: product.nombre,
          precio: product.precio,
          categoria: product.categoria,
          descripcion: product.descripcion,
          estado: product.estado
        });
        if (product.imagen) {
          this.previewImg = 'data:image/jpeg;base64,' + product.imagen;
        }
        this.loading = false;
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    this.form.patchValue({ imagenFile: file });
    const reader = new FileReader();
    reader.onload = () => this.previewImg = reader.result as string;
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    // Armar FormData
    const formData = new FormData();
    formData.append('nombre', this.form.get('nombre')!.value);
    formData.append('precio', this.form.get('precio')!.value.toString());
    formData.append('categoria', this.form.get('categoria')!.value ?? '');
    formData.append('descripcion', this.form.get('descripcion')!.value ?? '');
    formData.append('estado', this.form.get('estado')!.value.toString());
    const file = this.form.get('imagenFile')!.value;
    if (file) {
      formData.append('imagenFile', file);
    }

    let request$: Observable<any>;
    if (this.productId != null) {
      request$ = this.productService.update(this.productId, formData);
    } else {
      request$ = this.productService.create(formData);
    }

    request$.subscribe({
      next: () => this.ref.close(true),
      error: () => this.loading = false
    });
  }

  cancel(): void {
    this.ref.close(false);
  }
}
