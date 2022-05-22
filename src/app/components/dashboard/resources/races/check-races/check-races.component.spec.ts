import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRacesComponent } from './check-races.component';

describe('CheckRacesComponent', () => {
  let component: CheckRacesComponent;
  let fixture: ComponentFixture<CheckRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckRacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
