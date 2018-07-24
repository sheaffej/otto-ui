import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineLogListComponent } from './engine-log-list.component';

describe('EngineLogListComponent', () => {
  let component: EngineLogListComponent;
  let fixture: ComponentFixture<EngineLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
