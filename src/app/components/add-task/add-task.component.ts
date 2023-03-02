import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  text: string = '';
  day: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;
  update: boolean = false;
  id: number | undefined;

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));

    this.subscription = this.uiService
      .onSwitchMode()
      .subscribe((value) => (this.update = value));

    this.subscription = this.uiService.onSetTask().subscribe((value) => {
      this.text = value.text;
      this.day = value.day;
      this.reminder = value.reminder;
      this.id = value.id;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) return alert('Please add a task!');

    let newTask: Task = {
      text: this.text,
      reminder: this.reminder,
      day: this.day,
    };
    if (this.update) {
      newTask.id = this.id;
      this.onUpdateTask.emit(newTask);
    } else {
      this.onAddTask.emit(newTask);
    }

    this.text = '';
    this.reminder = false;
    this.day = '';
  }
}
