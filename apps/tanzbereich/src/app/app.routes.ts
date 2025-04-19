import { Route } from '@angular/router';

export const appRoutes: Route[] = [


   
  {
    path: '',
    redirectTo: 'workspace',
    pathMatch: 'full',
  },

  {
    path: 'workspace',
    loadComponent: () => import('@tanzbereich/workspace').then((m) => m.WorkspaceComponent),
  },


  {
    path: 'user-access',
    loadComponent: () => import('@tanzbereich/user-access').then((m) => m.UserAccessComponent),
  }



];
