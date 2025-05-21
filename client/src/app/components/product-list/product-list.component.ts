import { Component, OnInit } from '@angular/core';
import {
  trigger, state, style, transition, animate
} from '@angular/animations';
import {
  ConfirmationService, MessageService
} from 'primeng/api';
import {
  DynamicDialogRef, DialogService
} from 'primeng/dynamicdialog';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ConfirmationService, MessageService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('expanded',  style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition('collapsed <=> expanded', animate('300ms ease-out')),
    ])
  ]
})
export class ProductListComponent implements OnInit {
  products: Array<Product & { showDetails?: boolean }> = [];
  loading = false;
  layout: 'grid' | 'table' = 'grid';  // ahora 'table' en vez de 'list'
  searchValue = '';
  ref!: DynamicDialogRef;

  constructor(
    private productService: ProductService,
    private confirmation: ConfirmationService,
    private msg: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: list => {
        this.products = list.map(p => ({ ...p, showDetails: false }));
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  get filteredProducts(): Product[] {
    const q = this.searchValue.trim().toLowerCase();
    return q
      ? this.products.filter(p =>
          p.nombre.toLowerCase().includes(q) ||
          (p.categoria?.toLowerCase().includes(q) ?? false)
        )
      : this.products;
  }

  openForm(id?: number) {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: id ? 'Editar Producto' : 'Crear Producto',
      width: '500px',
      data: { id },
      closable: true
    });
    this.ref.onClose.subscribe((saved: boolean) => {
      if (saved) {
        this.msg.add({ severity:'success', summary:'Guardado', detail:'Producto guardado correctamente' });
        this.load();
      }
    });
  }

  onDelete(id: number) {
    this.confirmation.confirm({
      message: '¿Eliminar este producto?',
      accept: () => {
        this.productService.delete(id).subscribe({
          next: () => {
            this.msg.add({ severity:'success', summary:'Eliminado', detail:'Producto eliminado' });
            this.load();
          },
          error: () => this.msg.add({ severity:'error', summary:'Error', detail:'No se pudo eliminar' })
        });
      }
    });
  }

  toggleDetails(p: Product & { showDetails?: boolean }) {
    p.showDetails = !p.showDetails;
  }
}
