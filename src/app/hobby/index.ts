import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HobbyComponent, CircleProgressOptionsInterface, CircleProgressOptions } from './hobby.component';

export * from './hobby.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HobbyComponent,
  ],
  exports: [
    HobbyComponent,
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
