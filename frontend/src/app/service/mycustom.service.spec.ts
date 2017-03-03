/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MycustomService } from './mycustom.service';

describe('MycustomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MycustomService]
    });
  });

  it('should ...', inject([MycustomService], (service: MycustomService) => {
    expect(service).toBeTruthy();
  }));
});
