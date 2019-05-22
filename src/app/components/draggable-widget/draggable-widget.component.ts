import { Component, OnInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-draggable-widget',
  templateUrl: './draggable-widget.component.html',
  styleUrls: ['./draggable-widget.component.css']
})
export class DraggableWidgetComponent implements OnInit {

  isDraggable: boolean;
  points: { x: number, y: number };
  tempPoints: { x: number, y: number };
  tempElement: any;

  constructor(
    private sharedSvc: SharedService
  ) {
    this.points = {x: 0, y: 0};
    this.tempPoints = {x: 0, y: 0};
  }

  onDragEnded(e: CdkDragEnd) {
    const { source } = e;
    this.tempElement = source;
    const { transform } = this.tempElement.getRootElement().style;
    const regex = /translate3d\(\s?(?<x>[-]?\d*)px,\s?(?<y>[-]?\d*)px,\s?(?<z>[-]?\d*)px\)/;
    const { x, y } = regex.exec(transform).groups;
    this.tempPoints = { x: +x, y: +y };
  }

  savePosition() {
    this.points = { ...this.tempPoints };
  }

  undoPosition() {
    const { x, y } = this.points;
    const widgetElement = document.getElementById('widget');
    widgetElement.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    if (this.tempElement) {
      this.tempElement._dragRef._passiveTransform = { x, y };
    }
  }

  draggableObs() {
    this.sharedSvc.isDraggable$.subscribe(val => this.isDraggable = val);
  }

  positionObs() {
    this.sharedSvc.position$.subscribe(val => {
      if (val === 'save') {
        this.savePosition();
      } else if (val === 'undo') {
        this.undoPosition();
      }
    });
  }

  ngOnInit() {
    this.draggableObs();
    this.positionObs();
  }
}
