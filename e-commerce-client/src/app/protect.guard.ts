import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomerService } from './services/customer.service';
import { SellerService } from './services/seller.service';

export const protectGuard: CanActivateFn = (route, state) => {
  let status: boolean;
  let customerLoginStatus: boolean;
  let sellerLoginStatus: boolean;
  const customerService = inject(CustomerService);
  const sellerService = inject(SellerService);
  const router = inject(Router);

  customerService.getCustomerLoginStatus().subscribe({
    next: (loginStatus) => {
      customerLoginStatus = loginStatus;
    }
  });
  sellerService.getSellerLoginStatus().subscribe({
    next: (loginStatus) => {
      sellerLoginStatus = loginStatus;
    }
  });

  status = customerLoginStatus || sellerLoginStatus;
  
  if (status) {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
