import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamtionComponent } from './reclamtion.component';

describe('ReclamtionComponent', () => {
  let component: ReclamtionComponent;
  let fixture: ComponentFixture<ReclamtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamtionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
