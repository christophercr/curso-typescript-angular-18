import { TestBed } from '@angular/core/testing';

import { CollectionNameValidator } from './collection-name.validator';

describe('CollectionNameValidator', () => {
  let service: CollectionNameValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionNameValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
