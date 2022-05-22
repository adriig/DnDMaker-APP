import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRacesComponent } from './create-races.component';

describe('CreateRacesComponent', () => {
  let component: CreateRacesComponent;
  let fixture: ComponentFixture<CreateRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
