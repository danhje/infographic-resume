import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HobbiesTwoComponent } from './hobbies-2/hobbies.component';

@NgModule({
  declarations: [
    AppComponent,
    HobbiesTwoComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
