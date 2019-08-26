import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HobbiesComponent, CircleProgressOptionsInterface, CircleProgressOptions } from './hobbies.component';

export * from './hobbies.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HobbiesComponent,
  ],
  exports: [
    HobbiesComponent,
  ]
})
export class NgCircleProgressModule {
  static forRoot(options: CircleProgressOptionsInterface = {}): ModuleWithProviders {
    return {
      ngModule: NgCircleProgressModule,
      providers: [
        {provide: CircleProgressOptions, useValue: options}
      ]
    };
  }
}
