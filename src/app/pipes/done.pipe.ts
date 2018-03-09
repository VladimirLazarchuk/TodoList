import { Pipe, PipeTransform } from '@angular/core';
import {Task} from "../interfaces/interfaces";

@Pipe({
  name: 'done'
})
export class DonePipe implements PipeTransform {

  transform(items: Task[], display?: string): Task[] {
    if (display === 'all') {
      return items;
    }
    if (display === 'active') {
      return items.filter( (item: Task) => item['completed'] === false);
    }
    if (display === 'completed') {
      return items.filter( (item: Task) => item['completed'] === true);
    }
  }
}
