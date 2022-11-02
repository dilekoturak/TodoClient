import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from 'src/app/contracts/todoItem';
import { TodoListService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-edittodo',
  templateUrl: './edittodo.component.html',
  styleUrls: ['./edittodo.component.scss']
})
export class EdittodoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EdittodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem,
    private todoListService: TodoListService) { }
    todoData: TodoItem = new TodoItem();
    ngOnInit(): void {
      this.todoData = this.data
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    edit(data: any) {
      const todoItem: TodoItem = new TodoItem();
      todoItem.id = data.id ?? this.data.id;
      todoItem.title = data.title ?? '';
      todoItem.dueDate = data.dueDate ?? null;
      todoItem.completed = data.completed ?? false;
  
      this.todoListService.update(todoItem, () => {
        this.dialogRef.close();
      });
    }

}
