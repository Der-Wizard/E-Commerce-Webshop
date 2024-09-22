import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    { path:'', component: HomeComponent, canActivate: [authGuard], pathMatch: 'full' },
    { path:'products', component: ProductsComponent, canActivate: [authGuard] },
    { path:'login', component: LoginComponent, canActivate: [authGuard]},
    { path:'registration', component: RegistrationComponent, canActivate: [authGuard]},
    { path:'cart', component: CartComponent, canActivate: [authGuard]},
    { path:'account', component: AccountComponent, canActivate: [authGuard]},
    { path:'checkout', component: CheckoutComponent, canActivate: [authGuard]},
    { path:'about', component: AboutComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: ''},
];
