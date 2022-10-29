import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/shared/models/address.model';
import { Order, OrderItems, OrderStatus } from 'src/app/shared/models/order.model';
import { User } from 'src/app/shared/models/user.model';
import { OrdersService } from 'src/app/shared/services/api/orders/orders.service';
import { UsersService } from 'src/app/shared/services/api/users/users.service';
import { IOrderStatus } from './../../../../shared/models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: []
})
export class OrderDetailsComponent implements OnInit {

  key = '';
  commande: any = {};
  settings: any;
  source: any[] = [];
  orderId = 0;
  orderItems: OrderItems[] | any = [];
  order: Order | any = null;
  itemPrice: number | any;
  itemTva: number | any;
  load = false;
  orderAddress: Address | any = null;
  orderAddressId = 0;
  user: User | any = null;
  userid = 0;
  listOrderStatus: OrderStatus[] | any = null;
  selected: string | any = '';
  statusChanged = false;

  constructor(
    public activeModal: NgbActiveModal,
    private ordersService: OrdersService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.initSettings();
    if (this.commande) {
      if (this.key === 'co') {
        this.orderId = this.commande.co.order.id;
      } else if (this.key === 'vo') {
        this.orderId = this.commande.vo.order.id;
      } else if (this.key === 'op') {
        this.orderId = this.commande.op.id;
      } else {
        this.orderId = this.commande.order.id;
      }
      this.getOrderByOrderId(this.orderId);
    }
  }

  initSettings(): void {
    this.settings = {
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: 'right'
      },
      pager: {
        perPage: 20
      },
      columns: {
        description: {
          title: 'Bijoux',
          filter: false,
          sort: true
        },
        totalTtc: {
          title: 'Total TTC',
          filter: false,
          sort: true
        },
        quantity: {
          title: 'Quantité',
          filter: false,
          sort: true
        }
      }
    };
  }

  getOrderByOrderId(orderId: number): void {
    this.ordersService.getOrderByOrderId(orderId).subscribe((data: Order) => {
      this.order = data;
      this.getOrderItems(this.order.id);
      this.orderAddress = this.order?.address;
      this.userid = this.orderAddress?.user;
      this.getUserById();
      this.getOrderStatus();
    });
  }

  getOrderItems(orderId: number): void {
    this.ordersService.getOrderItems(orderId).subscribe((data: OrderItems[]) => {
      this.orderItems = data;
      if (this.orderItems.length > 0) {
         this.orderItems.map((i: OrderItems) => {
          const obj =
            {
              description: i.item?.name,
              totalTtc: i.item?.price + ' €',
              quantity: i.quantity
            };
          this.source.push(obj);
          this.load = true;
        });
      }
    });
  }

  getOrderStatus(): void {
    this.ordersService.getAllOrderStatus().subscribe((data: any) => {
      this.listOrderStatus = data;
      this.selected = this.order.status.name;
    });
  }

  changeStatus(): void {
    let order_status: any = this.listOrderStatus.find((orderStatus: any) => orderStatus.name == String(this.selected).toLowerCase());
    const formOrderData = {
      order_status_id: order_status.id,
      payment_type_id: 1,
      user_address_id: this.user?.id,
      price: this.order.price,
      received_at: '',
      send_at: '',
      reference: 'KB-20210417124321',
    };

    this.ordersService.putOrder(this.order.id, formOrderData).subscribe((data: any) => {
      console.warn(data);
      if (data) {
        this.statusChanged = true;
      }
    });
  }

  getUserById(): void {
    this.usersService.getUser(this.userid).subscribe((data: User) => {
      this.user = data;
    });
  }

  cancel(): void {
    this.activeModal.close();
  }

  closAlert(): void {
    this.statusChanged = false;
  }

}
