import { TestBed } from '@angular/core/testing';

import { ClassesServiceService } from './classes-service.service';

describe('ClassesServiceService', () => {
  let service: ClassesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
