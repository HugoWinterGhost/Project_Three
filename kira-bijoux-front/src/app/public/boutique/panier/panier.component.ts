import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { API_KEY } from 'src/app/shared/app-constants';
import { User } from 'src/app/shared/models/user.model';
import { OrdersService } from 'src/app/shared/services/api/orders/orders.service';
import { ShopService } from 'src/app/shared/services/api/shop/shop.service';
import { UsersService } from 'src/app/shared/services/api/users/users.service';
import { SecuService } from 'src/app/shared/services/secu/secu.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  user: User | null = null;
  submitError = false;
  shoppingCart: any;
  arrayPrice: any = [];
  subTotalPrice: any = 0;
  totalPrice: any = 0;
  handler: any = null;

  constructor(
    private shopService: ShopService,
    private cookieService: CookieService,
    private router: Router,
    private secuService: SecuService,
    private usersService: UsersService,
    private orderService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.secuService.redirectAdminAccess();
    this.getShoppingCartByUser();
    this.loadStripe();
    this.usersService.getUserState().subscribe(user => {
      this.user = user;
    });
  }

  getShoppingCartByUser(): void {
      this.shopService.getShoppingCartByUser(this.getIdCookiesStorage()).subscribe(
      (data: any[]) => {
        this.shoppingCart = data;
        this.shoppingCart.map((res: any) => {
          if (res.quantity === 1) {
            this.subTotalPrice += res.item.price;
          }
          else if (res.quantity > 1) {
            this.subTotalPrice += res.item.price * res.quantity;
          }
        });
        this.totalPrice = this.subTotalPrice + 6.90;
      }
    );
  }

  putItemToShoppingCart(itemId: number, quantity: string): void {
    const formData = {
      quantity: parseInt(quantity, 10)
    };
    this.shopService.putItemToShoppingCart(itemId, this.getIdCookiesStorage(), formData).subscribe(
      (data: any[]) => { document.location.reload(); },
      err => { this.submitError = true; }
    );
  }

  deleteItemToShoppingCart(itemId: number): void {
    this.shopService.deleteItemToShoppingCart(itemId, this.getIdCookiesStorage()).subscribe(
      () => { document.location.reload(); }
    );
  }

  redirectToBoutique(): void {
    this.router.navigateByUrl('/boutique/colliers', { skipLocationChange: false }).then(() => {
      this.router.navigate(['boutique']);
      document.location.reload();
    });
  }

  getIdCookiesStorage(): number {
    return parseInt(this.cookieService.get('kira-bijoux-id'), 10);
  }

  loadStripe(): void {
    if(!window.document.getElementById('stripe-script')) {
      let script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";       
      window.document.body.appendChild(script);
    }
  }

  onSubmitValidation(totalPrice: number): void {  
    let handler = (<any>window).StripeCheckout.configure({
      key: API_KEY,
      locale: 'auto',
      token: (token: any) => {
        this.onSuccessValidation(totalPrice);
      }
    });

    handler.open({
      name: 'Paiement Kira Bijoux',
      description: 'Paiement sécrisé avec Stripe',
      amount: totalPrice * 100,
      currency: 'eur',
      email: this.user?.mail
    });
  }

  onSuccessValidation(totalPrice: number): void {
    const formOrderData = {
      order_status_id: 3,
      payment_type_id: 1,
      user_address_id: this.user?.id,
      price: totalPrice,
      received_at: '',
      send_at: '',
      reference: 'KB-20210417124321',
    };

    this.orderService.getOrdersByUserId(this.user?.id).subscribe((order) => {
      this.shoppingCart.map((shop: any) => {
        this.shopService.deleteItemToShoppingCart(shop.item.id, this.getIdCookiesStorage()).subscribe();
      });
      this.orderService.putOrder(order[0].id, formOrderData).subscribe();
      alert('Paiement Réussi');
      this.router.navigateByUrl('/home', { skipLocationChange: false }).then(() => {
        this.router.navigate(['home']);
        document.location.reload();
      });
    });
  }
}
