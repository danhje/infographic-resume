import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgCircleProgressModule } from './hobbies';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      animationDuration: 300,
      title: 'test1'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
