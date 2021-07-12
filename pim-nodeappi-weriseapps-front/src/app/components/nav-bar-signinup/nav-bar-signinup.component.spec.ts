import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSigninupComponent } from './nav-bar-signinup.component';

describe('NavBarSigninupComponent', () => {
  let component: NavBarSigninupComponent;
  let fixture: ComponentFixture<NavBarSigninupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarSigninupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarSigninupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
