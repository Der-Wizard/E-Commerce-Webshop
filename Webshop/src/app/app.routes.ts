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
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductInfoComponent } from './components/products/product-info/product-info.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const routes: Routes = [
    { path:'', component: HomeComponent },
    { path:'home', redirectTo: '' },
    { path:'products', component: ProductsComponent},
    { path:'products/:id', component: ProductInfoComponent},
    { path:'login', component: LoginComponent, canActivate: [noAuthGuard]},
    { path:'registration', component: RegistrationComponent, canActivate: [noAuthGuard]},
    { path:'cart', component: CartComponent, canActivate: [authGuard]},
    { path:'account', component: AccountComponent, canActivate: [authGuard]},
    { path:'checkout', component: CheckoutComponent, canActivate: [authGuard]},
    { path:'about', component: AboutComponent },
    { path:'contact', component: ContactFormComponent },
    { path:'faq', component: FaqComponent },
    { path: '**', redirectTo: 'not-found'},
    { path: 'not-found', component: NotFoundComponent},
];
