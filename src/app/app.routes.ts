import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
//import { CounterComponent } from './domains/shared/components/counter/counter.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/products/pages/list/list.component'),
      },
      {
        path: 'about',
        //component: AboutComponent,
        loadComponent: () => import('./domains/info/pages/about/about.component'),
      },
      {
        path: 'product/:id', //El parámetro id va a ser dinámico, para traer el producto específico de la API
        //component: ProductDetailComponent,
        loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component'),
      }
    ],
  },
  // {
  //   path: 'counter',
  //   component: CounterComponent,
  // }
  {
    path: '**',
    component: NotFoundComponent,
  }
];
