import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToastrModule } from 'ngx-toastr';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { SliderModule } from 'primeng/slider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SlickCarouselModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TreeModule,
    ButtonModule,
    PaginatorModule,
    ProgressSpinnerModule,
    SliderModule
  ],
  exports : [
    SlickCarouselModule,
    ToastrModule,
    TreeModule,
    ButtonModule,
    PaginatorModule,
    ProgressSpinnerModule,
    SliderModule
  ]
})
export class SharedModule { }
