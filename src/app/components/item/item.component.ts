import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../interfaces/interfaces";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Output('itemManipulated') itemManipulated = new EventEmitter<string>();
  @Input() item: Task;

  isEditing: boolean = false;

  toggleStatus() {
    this.itemManipulated.emit('status');
  }

  itemManipulate(event: Event): void {
    if (event.target['dataset'].editstart) {
      this.isEditing = true;
    }
    if (event.target['dataset'].editend) {
      this.isEditing = false;
      this.itemManipulated.emit('edited');
    }
    if (event.target['dataset'].delete) {
      this.itemManipulated.emit('delete');
    }
  }

}
