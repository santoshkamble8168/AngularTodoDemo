import { TestBed } from '@angular/core/testing';

import { TodoapiService } from './todoapi.service';

describe('TodoapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoapiService = TestBed.get(TodoapiService);
    expect(service).toBeTruthy();
  });
});
