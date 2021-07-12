import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForumComponent } from './update-forum.component';

describe('UpdateForumComponent', () => {
  let component: UpdateForumComponent;
  let fixture: ComponentFixture<UpdateForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
