import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isDraggable: boolean;
  constructor(
    private sharedSvc: SharedService
  ) {
  }

  setDraggable(val: boolean) {
    this.sharedSvc.setDraggable$(val);
  }

  savePosition() {
    this.sharedSvc.setPosition$('save');
    this.sharedSvc.setDraggable$(false);
  }

  undoPosition() {
    this.sharedSvc.setPosition$('undo');
    this.sharedSvc.setDraggable$(false);
  }

  ngOnInit() {
    this.sharedSvc.isDraggable$.subscribe(val => {
      this.isDraggable = val;
    })
  }

}
