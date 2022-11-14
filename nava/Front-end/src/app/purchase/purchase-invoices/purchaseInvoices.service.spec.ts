/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PurchaseInvoicesService } from './purchaseInvoices.service';

describe('Service: PurchaseInvoices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseInvoicesService]
    });
  });

  it('should ...', inject([PurchaseInvoicesService], (service: PurchaseInvoicesService) => {
    expect(service).toBeTruthy();
  }));
});
