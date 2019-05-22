import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isDraggable$ = new BehaviorSubject<boolean>(false);
  position$ = new BehaviorSubject<string>('');

  setDraggable$(val: boolean) {
    this.isDraggable$.next(val);
  }

  setPosition$(val: string) {
    this.position$.next(val);
  }
  constructor() { }
}
