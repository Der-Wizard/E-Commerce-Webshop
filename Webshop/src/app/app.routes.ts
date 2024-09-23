import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
    { path:'', component: HomeComponent, pathMatch: 'full' },
    { path:'products', component: ProductsComponent},
    { path:'login', component: LoginComponent, canActivate: [noAuthGuard]},
    { path:'registration', component: RegistrationComponent, canActivate: [noAuthGuard]},
    { path:'cart', component: CartComponent, canActivate: [authGuard]},
    { path:'account', component: AccountComponent, canActivate: [authGuard]},
    { path:'checkout', component: CheckoutComponent},
    { path:'about', component: AboutComponent },
    { path: '**', redirectTo: ''},
];
