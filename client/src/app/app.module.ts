import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // ← debe ir antes de los módulos PrimeNG que usan animaciones
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }   from './app.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';

// PrimeNG
import { TableModule }          from 'primeng/table';
import { DataViewModule }       from 'primeng/dataview';
import { CardModule }           from 'primeng/card';
import { DividerModule }        from 'primeng/divider';
import { ToolbarModule }        from 'primeng/toolbar';
import { ButtonModule }         from 'primeng/button';
import { InputTextModule }      from 'primeng/inputtext';
import { InputTextareaModule }  from 'primeng/inputtextarea';
import { RadioButtonModule }    from 'primeng/radiobutton';
import { FileUploadModule }     from 'primeng/fileupload';
import { DropdownModule }       from 'primeng/dropdown';
import { TagModule }            from 'primeng/tag';
import { SidebarModule }        from 'primeng/sidebar';
import { MenuModule }           from 'primeng/menu';
import { ToastModule }          from 'primeng/toast';
import { ConfirmDialogModule }  from 'primeng/confirmdialog';
import { DialogModule }         from 'primeng/dialog';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';

import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,      // ← indispensable para toasts, dialogs y animaciones
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    DataViewModule,
    CardModule,
    DividerModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    SidebarModule,
    MenuModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    DynamicDialogModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
