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
  subscription : Subscription

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value)=>this.showAddTask = value) 
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) return alert('Please add a task!');
    let newTask = {
      text: this.text,
      reminder: this.reminder,
      day: this.day,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.reminder = false;
    this.day = '';
  }
}
