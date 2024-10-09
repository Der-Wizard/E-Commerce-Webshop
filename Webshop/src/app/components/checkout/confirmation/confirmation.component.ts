import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../services/cart/models/order';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  private order!: Order;

  constructor(private route: ActivatedRoute, private router: Router){
    this.route.paramMap.subscribe(params => {
      let orderId = params.get('orderId');
      if(!orderId)
        router.navigate(['']);

      this.order = new Order();
    });
  }
}
