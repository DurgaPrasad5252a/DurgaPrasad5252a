import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StdLoginComponent } from './std-login/std-login.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, StdLoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    //OrderModule,
    NgxPaginationModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
