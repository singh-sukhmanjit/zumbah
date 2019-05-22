import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-draggable-widget',
  templateUrl: './draggable-widget.component.html',
  styleUrls: ['./draggable-widget.component.css']
})
export class DraggableWidgetComponent implements OnInit {

  isDraggable: boolean;
  points;
  tempPoints;
  tempElem;

  constructor(
    private sharedSvc: SharedService
  ) {
    this.points = {x: 0, y: 0};
    this.tempPoints = {x: 0, y: 0};
  }

  onDragEnded(e) {
    const element = e.source.getRootElement().style.transform;
    const regex = /translate3d\(\s?(?<x>[-]?\d*)px,\s?(?<y>[-]?\d*)px,\s?(?<z>[-]?\d*)px\)/;
    const { x, y } = regex.exec(element).groups;
    this.tempPoints = {x: +x, y: +y};
    this.tempElem = e.source;
  }

  savePosition() {
    this.points = {...this.tempPoints};
  }

  undoPosition() {
    const widgetElement = document.getElementById('widget');
    widgetElement.style.transform = `translate3d(${this.points.x}px, ${this.points.y}px, 0px)`;
    if (this.tempElem) {
      this.tempElem._dragRef._passiveTransform = {...this.points};
    }
  }

  draggableObs() {
    this.sharedSvc.isDraggable$.subscribe(val => {
      this.isDraggable = val;
    })
  }

  positionObs() {
    this.sharedSvc.position$.subscribe(val => {
      if (val === 'save') {
        this.savePosition();
      } else if (val === 'undo') {
        this.undoPosition();
      }
    })
  }

  ngOnInit() {
    this.draggableObs();
    this.positionObs();
  }
}
