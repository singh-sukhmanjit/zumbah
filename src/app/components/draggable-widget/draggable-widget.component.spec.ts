import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableWidgetComponent } from './draggable-widget.component';

describe('DraggableWidgetComponent', () => {
  let component: DraggableWidgetComponent;
  let fixture: ComponentFixture<DraggableWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
