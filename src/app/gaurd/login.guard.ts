import { CanActivateFn } from '@angular/router';
import { ServicesService } from '../services.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const Login=inject(ServicesService);
  return Login.isenabledashboard;
};
