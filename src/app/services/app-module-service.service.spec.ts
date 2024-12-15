import { TestBed } from '@angular/core/testing';

import { AppModuleServiceService } from './app-module-service.service';

describe('AppModuleServiceService', () => {
  let service: AppModuleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppModuleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
