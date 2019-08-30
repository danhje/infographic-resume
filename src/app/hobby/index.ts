import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HobbyComponent } from './hobby.component';

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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgCircleProgressModule,
      providers: []
    };
  }
}
