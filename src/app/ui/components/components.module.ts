import { TodoModule } from './todo/todo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TodoModule
  ]
})
export class ComponentsModule { }
