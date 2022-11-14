/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalPurchaceOrderService } from './localPurchaceOrder.service';

describe('Service: LocalPurchaceOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalPurchaceOrderService]
    });
  });

  it('should ...', inject([LocalPurchaceOrderService], (service: LocalPurchaceOrderService) => {
    expect(service).toBeTruthy();
  }));
});
