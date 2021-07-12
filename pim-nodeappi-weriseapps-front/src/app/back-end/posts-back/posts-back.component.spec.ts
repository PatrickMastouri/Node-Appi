import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsBackComponent } from './posts-back.component';

describe('PostsBackComponent', () => {
  let component: PostsBackComponent;
  let fixture: ComponentFixture<PostsBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
