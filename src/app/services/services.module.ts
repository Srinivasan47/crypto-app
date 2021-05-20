import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './../http-error.interceptor';
import { DataService } from './data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [{

     provide: HTTP_INTERCEPTORS,

     useClass: HttpErrorInterceptor,

     multi: true

   },DataService]
})
export class ServicesModule { }