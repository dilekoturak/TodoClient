import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from 'src/app/contracts/todoItem';
import { TodoListService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddtodoComponent implements OnInit {

  constructor(private fb: FormBuilder, private todoListService: TodoListService) { }

  dueDate:Date = new Date();
  todoForm = new FormGroup({
    title: new FormControl(''),
    dueDate: new FormControl()
  });
  submitted = false;

  ngOnInit(): void {
    this.todoForm = this.fb.group(
      {
        title: ['', [
          Validators.required,
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(250),
          Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')
        ]],
        dueDate: []
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.todoForm.controls;
  }
  @Output() addTodo: EventEmitter<TodoItem> = new EventEmitter();

  add() {
    this.submitted = true;

    if (this.todoForm.invalid) {
      return;
    }
    
    const todoItem: TodoItem = new TodoItem();
    todoItem.title = this.todoForm.value.title ?? '';
    todoItem.dueDate = this.todoForm.value.dueDate ?? null;

    this.todoListService.post(todoItem, () => {
      this.addTodo.emit(todoItem)
    }, errorMessage => {
      alert(errorMessage)
    });
  }
}
