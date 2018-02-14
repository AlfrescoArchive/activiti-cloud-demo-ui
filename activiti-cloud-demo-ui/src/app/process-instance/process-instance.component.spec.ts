import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInstanceComponent } from './process-instance.component';

describe('ProcessInstanceComponent', () => {
  let component: ProcessInstanceComponent;
  let fixture: ComponentFixture<ProcessInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
