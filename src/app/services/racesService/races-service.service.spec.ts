import { TestBed } from '@angular/core/testing';

import { RacesServiceService } from './races-service.service';

describe('RacesServiceService', () => {
  let service: RacesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
