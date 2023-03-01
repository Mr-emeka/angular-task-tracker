import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService, private router: Router) {
    // constructor runs whenever an object is initialized
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }
  ngOnInit(): void {
    //ngOnInit - life cycle method
  }

  //
  toggleAddTask() {
    this.uiService.toggleAddTask();
  }
  hasRoute(route: string) {
    return this.router.url == route;
  }
}
