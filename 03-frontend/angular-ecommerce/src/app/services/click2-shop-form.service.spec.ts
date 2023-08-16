import { TestBed } from '@angular/core/testing';

import { Click2ShopFormService } from './click2-shop-form.service';

describe('Click2ShopFormService', () => {
  let service: Click2ShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Click2ShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
