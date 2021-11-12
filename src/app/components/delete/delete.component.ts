import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  @Output() finish = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  cancel() {
    this.finish.emit();
  }
  confirm() {
    this.finish.emit();
  }
}
