import { TodolistComponent } from './todolist/todolist.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoItem } from 'src/app/contracts/todoItem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: any;
  constructor() { }

  ngOnInit() {

  }

  @ViewChild(TodolistComponent) listComponent: TodolistComponent | undefined
  addTodo($event : TodoItem) {
    this.todoList = this.listComponent?.getPendingItems()
  }
}
