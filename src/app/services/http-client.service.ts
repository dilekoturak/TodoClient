import { TodoItem } from './../contracts/todoItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(requestParameters: Partial<RequestParameters>): string {
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.
      controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
  }
  get(requestParameters: Partial<RequestParameters>, id?: string): Observable<TodoItem> {
    let url: string = "";
    url = `${this.url(requestParameters)}${id ? `/${id}` : ""}`;
    return this.httpClient.get<TodoItem>(url, { headers: requestParameters.headers})
  }

  getItemList(requestParameters: Partial<RequestParameters>): Observable<TodoItem> {
    let url: string = "";
    url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    return this.httpClient.get<TodoItem>(url, { headers: requestParameters.headers})
  }

  post(requestParameters: Partial<RequestParameters>, body: TodoItem): Observable<TodoItem> { 
    let url: string = "";
    url = `${this.url(requestParameters)}`;
    return this.httpClient.post<TodoItem>(url, body, { headers: requestParameters.headers})
  }

  put(requestParameter: Partial<RequestParameters>, body: TodoItem): Observable<TodoItem> {
    let url: string = "";
    url = `${this.url(requestParameter)}`;
    return this.httpClient.put<TodoItem>(url, body, { headers: requestParameter.headers });
  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string): Observable<TodoItem> {
    let url: string = "";
    url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    return this.httpClient.delete<TodoItem>(url, { headers: requestParameter.headers });
  }
}

export class RequestParameters {
    controller?:string;
    action?:string;
    id?:string;
    headers?:HttpHeaders;
    baseUrl?: string;
    queryString?: string;
}
