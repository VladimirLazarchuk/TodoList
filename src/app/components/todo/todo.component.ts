import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from 'ng4-social-login';

import {HttpService} from '../../services/http.service';
import {Task} from '../../interfaces/interfaces';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  inputText = ``;
  tasks: Task[] = [];
  displayMode = 'all';

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private router: Router,
              private ls: LocalStorageService) {
  }

  ngOnInit() {
    if (!this.ls.getUser()) {
      this.router.navigate(['../']);
    }
    this.getTasks();
  }

  getTasks() {
    this.httpService.getTasks()
      .subscribe(
        (data) => {
          if (data && data.success) {
            this.tasks = data.tasks;
          }
        },
        () => {

        });
  }

  getCounts(tasks: Array<Task>) {
    let count = 0;
    for (const item of tasks) {
      if (!item.completed) {
        count++;
      }
    }
    return count;
  }

  showMode(mode) {
    this.displayMode = mode;
  }

  clearCompleted() {
    const completed = [];
    this.tasks.forEach((item) => {
      item.completed && completed.push(item.id);
    });
    const requestData = {
      tasks: completed
    };
    this.httpService.deleteTasks(requestData)
      .subscribe((data) => {
          if (data && data.success) {
            this.tasks = this.tasks.filter((item) => {
              return !item.completed;
            });
          }
        },
        () => {

        });
  }

  addItem() {
    this.httpService.addTask(this.inputText)
      .subscribe((data) => {
      if (data && data.success) {
        this.inputText = ``;
        this.tasks.unshift(data.task);
      }
      },
      () => {

      });
  }

  handleManipulation(manipulation: string, task: any, index: number): void {
    if (manipulation === 'status') {
      const requestData = {
        id: task.id,
        update: {
          completed: !task.completed
        }
      };
      this.httpService.changeTaskData(requestData)
        .subscribe((data) => {
            if (data && data.success) {
              task.completed = !task.completed;
            }
          },
          () => {

          });
    }
    if (manipulation === 'delete') {
      const requestData = {
        tasks: [task.id]
      };
      this.httpService.deleteTasks(requestData)
        .subscribe((data) => {
            if (data && data.success) {
              this.tasks.splice(index, 1);
            }
          },
          () => {

          });
    }
    if (manipulation === 'edited') {
      const requestData = {
        id: task.id,
        update: {
          task: task.task
        }
      };
      this.httpService.changeTaskData(requestData)
        .subscribe((data) => {

          },
          () => {

          });
    }
  }

  signOut(): void {
    this.authService.signOut()
      .then(() => {
        this.ls.removeUser();
        this.router.navigate(['../']);
    })
      .catch(() => {

      });

  }

}
