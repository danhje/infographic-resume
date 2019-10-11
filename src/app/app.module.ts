import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { PopoverComponent } from './popover/popover.component';
import { PersonalityComponent } from './personality/personality.component';
import { SkillprofileComponent } from './skillprofile/skillprofile.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    PopoverComponent,
    HobbiesComponent,
    PersonalityComponent,
    SkillprofileComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
  ],
  entryComponents: [PopoverComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
