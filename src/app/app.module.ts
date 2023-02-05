import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './container/header/header.component';
import { KitapEditComponent } from './kitap-edit/kitap-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KitapListComponent } from './kitap-list/kitap-list.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ObservableLearnComponent } from './observable-learn/observable-learn.component';

const appRoutes : Routes = [
  {path:'',component:KitapListComponent},
  { path: 'kitaplar',component: KitapListComponent},
  { path: 'kitapEkle',component: KitapEditComponent},
  { path: 'auth',component: AuthComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    KitapEditComponent,
    KitapListComponent,
    AuthComponent,
    ObservableLearnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
