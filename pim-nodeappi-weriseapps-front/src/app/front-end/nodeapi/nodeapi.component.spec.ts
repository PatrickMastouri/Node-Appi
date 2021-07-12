import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeapiComponent } from './nodeapi.component';

describe('NodeapiComponent', () => {
  let component: NodeapiComponent;
  let fixture: ComponentFixture<NodeapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
