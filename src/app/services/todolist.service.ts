import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from 'src/app/contracts/todoItem';
import { HttpClientService } from './http-client.service';
import { interval, take, lastValueFrom, Observable, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoListService {
    constructor(private httpClientService: HttpClientService) { }

    post(todoItem: TodoItem, success: () => void, errorCallBack: (errorMessage: string) => void) {
        this.httpClientService.post({
            controller: "todolist"
        }, todoItem).subscribe(result => {
            success()
        }, (errorResponse: HttpErrorResponse) => {
            let errorMessage: string = errorResponse.error;
            errorCallBack(errorMessage);
        });
    }

    async getPendingItems(page: number = 0, size: number = 5): Promise<{pendingTotalCount: number, pendingItems: TodoItem[]}> {
        const data: any = await this.httpClientService.getItemList({
            controller: "todolist",
            action: "pending",
            queryString: `page=${page}&size=${size}`
        }).toPromise()

        return data;
    }

    async getOverdueItems(page: number = 0, size: number = 5): Promise<{overdueTotalCount: number, overdueItems: TodoItem[]}> {
        const data: any = await this.httpClientService.getItemList({
            controller: "todolist",
            action: "overdue",
            queryString: `page=${page}&size=${size}`
        }).toPromise()

        return data;
    }

    async delete(id: string) {
        const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
            controller: "todolist"
        }, id)
        await firstValueFrom(deleteObservable)
    }

    async update(todoItem: TodoItem, success: () => void) {
        const data: any = await this.httpClientService.put({
            controller: "todolist"
        }, todoItem).subscribe(result => {
            console.log(result)
            success()
        })
    }
}
