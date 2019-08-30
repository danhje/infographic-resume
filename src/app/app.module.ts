import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgCircleProgressModule } from './hobby';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { HobbiesTwoComponent } from './hobbies-2/hobbies.component';

@NgModule({
  declarations: [
    AppComponent,
    HobbiesComponent,
    HobbiesTwoComponent
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
