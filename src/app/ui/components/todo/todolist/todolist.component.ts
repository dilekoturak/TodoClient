import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TodoItem } from 'src/app/contracts/todoItem';
import { TodoListService } from 'src/app/services/todolist.service';
import { MatDialog } from '@angular/material/dialog';
import { EdittodoComponent } from '../edittodo/edittodo.component';
declare var $ : any;

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  constructor(private todoListService: TodoListService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['title', 'dueDate', 'completed', 'delete', 'edit'];
  pendingDataSource: any;
  overdueDataSource: any;
  @Input() child_List : any;
  @ViewChild('pendingPaginator') pendingPaginator?: MatPaginator;
  @ViewChild('overduePaginator') overduePaginator?: MatPaginator;
  @ViewChild(MatSort) pendingSort?: MatSort;
  @ViewChild(MatSort) overdue?: MatSort;

  ngOnInit() {
    this.getPendingItems()
    this.getOverdueItems()
  }

  async getPendingItems() {
    const pendingItems: { pendingTotalCount: number, pendingItems: TodoItem[]} = await this.todoListService.getPendingItems(this.pendingPaginator?.pageIndex, this.pendingPaginator?.pageSize)
    this.pendingDataSource = new MatTableDataSource<TodoItem>(pendingItems.pendingItems)
    this.pendingDataSource.pendingPaginator = this.pendingPaginator
    this.pendingDataSource.sort = this.pendingSort

    if (this.pendingPaginator) {
      this.pendingPaginator.length = pendingItems.pendingTotalCount
    }
  }

  async getOverdueItems() {
    const overdueItems: { overdueTotalCount: number, overdueItems: TodoItem[]} = await this.todoListService.getOverdueItems(this.overduePaginator?.pageIndex, this.overduePaginator?.pageSize)
    this.overdueDataSource = new MatTableDataSource<TodoItem>(overdueItems.overdueItems)
    this.overdueDataSource.overduePaginator = this.overduePaginator
    this.overdueDataSource.sort = this.overdue;

    if (this.overduePaginator) {
      this.overduePaginator.length = overdueItems.overdueTotalCount;
    }
  }

  pendingPageChanged() {
    this.getPendingItems()
  }

  overduePageChanged() {
    this.getOverdueItems()
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(EdittodoComponent, {
      width: '250px',
      data:data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPendingItems()
      this.getOverdueItems()
  });
  }
}
