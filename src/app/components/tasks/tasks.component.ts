import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private uiService: UiService) {}
  ngOnInit(): void {
    //normal way
    //  this.tasks = this.taskService.getTask();

    //use observables if you are fetching from a server

    //working with observables
    this.taskService.getTaskApi().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe();

    // this.taskService
    //   .updateTask(task)
    //   .subscribe(
    //     () =>
    //       (this.tasks = this.tasks.map((t) =>
    //         task.id == t.id ? { ...t, reminder: !task.reminder } : { ...t }
    //       ))
    //   );
  }

  addTask(newTask: Task) {
    this.taskService
      .createTask(newTask)
      .subscribe((task) => this.tasks.push(task));
    this.uiService.toggleAddTask();
  }
  editTask(task: Task) {
    this.uiService.toggleAddTask(true);
    this.uiService.mode(true);
    this.uiService.setTask(task);
  }
  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(() => {
      let index = this.tasks.findIndex((t) => t.id == task.id);
      this.tasks[index] = task;
    });
    this.uiService.toggleAddTask();
  }
}
