import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { PopoverComponent } from './popover/popover.component';
import { PersonalityComponent } from './personality/personality.component';

@NgModule({
  declarations: [
    AppComponent,
    PopoverComponent,
    HobbiesComponent,
    PersonalityComponent
  ],
  imports: [
    BrowserModule,
  ],
  entryComponents: [PopoverComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
