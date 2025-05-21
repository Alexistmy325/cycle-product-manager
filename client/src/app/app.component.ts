// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarVisible = false;
  breadcrumb: string = '';
  menuItems: MenuItem[] = [
    { label: 'Productos', icon: 'pi pi-fw pi-list', routerLink: '/products' },
    // aquí puedes añadir más opciones
  ];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e: NavigationEnd) => {
        const url = e.urlAfterRedirects;
        if (url.startsWith('/products/new'))      return 'Crear Producto';
        if (url.startsWith('/products/') && url.endsWith('/edit')) return 'Editar Producto';
        return 'Productos';
      })
    ).subscribe(label => this.breadcrumb = label);
  }
}
