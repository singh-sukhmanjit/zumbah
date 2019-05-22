import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isDraggable: boolean;
  constructor(private sharedService: SharedService) {}

  setDraggable(val: boolean) {
    this.sharedService.setDraggable$(val);
  }

  savePosition() {
    this.sharedService.setPosition$('save');
    this.sharedService.setDraggable$(false);
  }

  undoPosition() {
    this.sharedService.setPosition$('undo');
    this.sharedService.setDraggable$(false);
  }

  ngOnInit() {
    this.sharedService.isDraggable$.subscribe(val => this.isDraggable = val);
  }

}
