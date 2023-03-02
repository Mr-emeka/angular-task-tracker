import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();
  private modeSubject = new Subject<any>();
  private taskSubject = new Subject<any>();
  private update: boolean = false;
  private task!: Task;

  constructor() {}
  mode(value: boolean): void {
    this.update = value;
    this.modeSubject.next(this.update);
  }

  setTask(task: Task) {
    this.task = task;
    this.taskSubject.next(this.task);
  }

  toggleAddTask(value?: boolean): void {
    if (value) {
      this.showAddTask = value;
    } else {
      this.showAddTask = !this.showAddTask;
    }
    this.subject.next(this.showAddTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  onSwitchMode(): Observable<any> {
    return this.modeSubject.asObservable();
  }

  onSetTask(): Observable<any> {
    return this.taskSubject.asObservable();
  }
}
