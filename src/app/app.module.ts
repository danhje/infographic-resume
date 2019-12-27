import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { PopoverComponent } from './popover/popover.component';
import { PersonalityComponent } from './personality/personality.component';
import { SkillprofileComponent } from './skillprofile/skillprofile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SummaryComponent } from './summary/summary.component';
import { GradesComponent } from './grades/grades.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { PrngService } from './prng.service';

@NgModule({
  declarations: [
    AppComponent,
    PopoverComponent,
    HobbiesComponent,
    PersonalityComponent,
    SkillprofileComponent,
    TimelineComponent,
    SummaryComponent,
    GradesComponent,
    TestimonialComponent,
    TechnologiesComponent
  ],
  imports: [
    BrowserModule,
  ],
  entryComponents: [PopoverComponent],
  providers: [PrngService],
  bootstrap: [AppComponent]
})
export class AppModule { }
