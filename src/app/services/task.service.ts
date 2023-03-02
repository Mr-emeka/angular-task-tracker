import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TASKS } from 'src/app/mock-task';
import { Task } from 'src/app/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root',
})


export class TaskService {
  private apiUrl = 'http://localhost:5001/tasks';

  constructor(private http: HttpClient) {}

  //with observables
  getTask(): Observable<Task[]> {
    const task = of(TASKS);
    return task;
  }

  //normal way
  getTaskN(): Task[] {
    return TASKS;
  }

  //with http
  getTaskApi(): Observable<Task[]> {
    let tasks = this.http.get<Task[]>(this.apiUrl);
    return tasks;
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  //patch changes just a value , put updates the item with the set new item
  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
    // return this.http.patch<Task>(url, { reminder: !task.reminder }, httpOptions);
  }

  createTask (newTask: Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, newTask)
  }
}
