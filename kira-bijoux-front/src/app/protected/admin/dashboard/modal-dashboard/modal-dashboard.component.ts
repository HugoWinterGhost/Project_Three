import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { User } from 'src/app/shared/models/user.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ButtonViewComponent } from 'src/app/shared/components/button-view/button-view.component';
import { OrderDetailsComponent } from '../../gestion-commandes/order-details/order-details.component';
import { formatDateToWeb } from 'src/app/shared/services/utils/utils.service';
import { ButtonUpdateComponent } from 'src/app/shared/components/button-view/button-update.component';
import { ProductUpdateComponent } from '../../gestion-produits/product-update/product-update.component';
import { ProductDetailsComponent } from '../../gestion-produits/product-details/product-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { OrdersService } from 'src/app/shared/services/api/orders/orders.service';

@Component({
  selector: 'app-modal-dashboard',
  templateUrl: './modal-dashboard.component.html'
})
export class ModalDashboardComponent implements OnInit {

  settings: any;
  source: any[] = [];

  keyWord: any;
  users: User[] | any = [];
  orders: [] | any = [];
  chiffreAffaires: string | any = null;
  items: string[] | any = null;
  validateOrders: [] | any = [];
  cancelledOrders: [] | any = [];
  unstockedItems: [] | any = [];
  stockedItems: [] | any = [];
  ordersToPrepare: [] | any = [];

  indicatorUsers = 'Utilisateurs inscrits';
  indicatorValidateOrder = 'Commandes payées';
  indicatorCa = 'Chiffre d\'affaires';
  indicatorStockedProducts = 'Produits disponibles';
  indicatorCancelledOrders = 'Commandes annulées';
  indicatorUnstockedProducts = 'Produits à fabriquer';
  indicatorOrdersToPrepare = 'Commandes à préparer';

  deleteItemSuccess = false;
  updateItemSuccess = false;
  deleteUserSuccess = false;
  deleteUserName = '';

  lineChartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];

  lineChartLabels: Label[] = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255, 255, 0, 0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private ordersService: OrdersService,
    ) { }

  ngOnInit(): void {
      this.initTableSettings();
      this.initGraph();
  }

  initTableSettings(): void {
    if (this.keyWord === this.indicatorUsers) {
        this.settings = {
            actions: {
                add: false,
                edit: false,
                delete: false,
                position: 'right'
            },
            pager: {
                perPage: 10
            },
            columns: {
                id: {
                title: 'ID',
                filter: false,
                sort: true
                },
                lastName: {
                title: 'Nom',
                filter: false,
                sort: true
                },
                firstName: {
                title: 'Prénom',
                filter: false,
                sort: true
                },
                mail: {
                title: 'Mail',
                filter: false,
                sort: true
                },
                button: {
                title: '',
                type: 'custom',
                filter: false,
                width: '20px',
                valuePrepareFonction: (value: any, row: any, cell: any) => {
                    return {
                    icon: faEye,
                    animation: 'pulse',
                    tooltip: 'Voir le détail',
                    placement: 'top'
                    };
                },
                renderComponent: ButtonViewComponent,
                onComponentInitFunction: (instance: any) => {
                    instance.view.subscribe((row: any) => {
                      this.openUserViewDialog(row);
                    });
                }
                }
            }
        };
    } else if (this.keyWord === this.indicatorValidateOrder) {
        this.settings = {
            actions: {
              add: false,
              edit: false,
              delete: false,
              position: 'right'
            },
            pager: {
              perPage: 10
            },
            columns: {
              commande: {
                title: 'N° de commande',
                filter: false,
                sort: true
              },
              date: {
                title: 'Date',
                filter: false,
                sort: true
              },
              statut: {
                title: 'Statut',
                filter: false,
                sort: true
              },
              prix: {
                title: 'Total TTC',
                filter: false,
                sort: true
              },
              button: {
                title: '',
                type: 'custom',
                filter: false,
                width: '20px',
                valuePrepareFonction: (value: any, row: any, cell: any) => {
                  return {
                    icon: faEye,
                    animation: 'pulse',
                    tooltip: 'Voir le détail',
                    placement: 'top'
                  };
                },
                renderComponent: ButtonViewComponent,
                onComponentInitFunction: (instance: any) => {
                  instance.view.subscribe((row: any) => {
                    this.openOrderCardDialog(row, 'vo');
                  });
                }
              }
            }
          };
    } else if (this.keyWord === this.indicatorCancelledOrders) {
      this.settings = {
          actions: {
            add: false,
            edit: false,
            delete: false,
            position: 'right'
          },
          pager: {
            perPage: 10
          },
          columns: {
            commande: {
              title: 'N° de commande',
              filter: false,
              sort: true
            },
            date: {
              title: 'Date',
              filter: false,
              sort: true
            },
            statut: {
              title: 'Statut',
              filter: false,
              sort: true
            },
            prix: {
              title: 'Total TTC',
              filter: false,
              sort: true
            },
            button: {
              title: '',
              type: 'custom',
              filter: false,
              width: '20px',
              valuePrepareFonction: (value: any, row: any, cell: any) => {
                return {
                  icon: faEye,
                  animation: 'pulse',
                  tooltip: 'Voir le détail',
                  placement: 'top'
                };
              },
              renderComponent: ButtonViewComponent,
              onComponentInitFunction: (instance: any) => {
                instance.view.subscribe((row: any) => {
                  this.openOrderCardDialog(row, 'co');
                });
              }
            }
          }
        };
  } else if (this.keyWord === this.indicatorStockedProducts || this.keyWord === this.indicatorUnstockedProducts) {
        this.settings = {
            actions: {
              add: false,
              edit: false,
              delete: false,
              position: 'right'
            },
            pager: {
              perPage: 10
            },
            columns: {
              name: {
                title: 'Nom',
                filter: true,
                sort: true
              },
              type: {
                title: 'Type',
                filter: true,
                sort: true
              },
              price: {
                title: 'Prix TTC',
                filter: true,
                sort: true
              },
              stock: {
                title: 'Stock',
                filter: true,
                sort: true
              },
              buttonView: {
                title: '',
                type: 'custom',
                filter: false,
                width: '20px',
                valuePrepareFonction: (value: any, row: any, cell: any) => {
                  return {
                    icon: faEye,
                    animation: 'pulse',
                    tooltip: 'Voir le produit',
                    placement: 'top'
                  };
                },
                renderComponent: ButtonViewComponent,
                onComponentInitFunction: (instance: any) => {
                  instance.view.subscribe((row: any) => {
                    this.openProductViewDialog(row);
                  });
                }
              },
              buttonUpdate: {
                title: '',
                type: 'custom',
                filter: false,
                width: '20px',
                valuePrepareFonction: (value: any, row: any, cell: any) => {
                  return {
                    icon: faPencilAlt,
                    animation: 'pulse',
                    tooltip: 'Modifier le produit',
                    placement: 'top'
                  };
                },
                renderComponent: ButtonUpdateComponent,
                onComponentInitFunction: (instance: any) => {
                  instance.view.subscribe((row: any) => {
                    this.openProductUpdateDialog(row);
                  });
                }
              }
            }
          };
    } else if (this.keyWord === this.indicatorOrdersToPrepare) {
      this.settings = {
          actions: {
            add: false,
            edit: false,
            delete: false,
            position: 'right'
          },
          pager: {
            perPage: 10
          },
          columns: {
            commande: {
              title: 'N° de commande',
              filter: false,
              sort: true
            },
            date: {
              title: 'Date',
              filter: false,
              sort: true
            },
            statut: {
              title: 'Statut',
              filter: false,
              sort: true
            },
            prix: {
              title: 'Total TTC',
              filter: false,
              sort: true
            },
            button: {
              title: '',
              type: 'custom',
              filter: false,
              width: '20px',
              valuePrepareFonction: (value: any, row: any, cell: any) => {
                return {
                  icon: faEye,
                  animation: 'pulse',
                  tooltip: 'Voir le détail',
                  placement: 'top'
                };
              },
              renderComponent: ButtonViewComponent,
              onComponentInitFunction: (instance: any) => {
                instance.view.subscribe((row: any) => {
                  this.openOrderCardDialog(row, 'op');
                });
              }
            }
          }
        };
  }
    this.initDataSource();
  }

  initGraph(): void {
    this.ordersService.getAllOrders().subscribe((orders: Order[]) => {
      orders = orders.sort((a, b) => new Date(String(a.inserted_at?.toString())).getTime() - new Date(String(b.inserted_at?.toString())).getTime());
      let results: Array<{ month: number; price: number }> = [];
      orders.map((order: Order) => {
        results.push({ month: new Date(String(order.inserted_at?.toString())).getMonth() + 1, price: Number(order.price) });
      });
      for (let i = 0; i < results.length - 1; i++) {
        if (results[i + 1].month == results[i].month) {
          results[i].price = results[i].price + results[i + 1].price;
          if (results[i + 2].month == results[i].month) {
            results[i].price = results[i].price + results[i + 2].price;
          }
          if (results.length > 7) {
            if (results[i + 3].month == results[i].month) {
              results[i].price = results[i].price + results[i + 3].price;
            }
          }
          let resultIndex: number = results.indexOf(results[i + 1], 0)
          results.splice(resultIndex);
        } 
      }
      results = results.sort((a, b) => a.month - b.month);
      let finalResults: any[] = []; 
      let currentMonth: number = new Date(Date.now()).getMonth() + 1;
      for(let index: number = 1; index <= currentMonth; index++) {
        let resultsFind: any = results.find((result) => result.month == index);
        if (resultsFind) {
          finalResults.push(resultsFind.price);
        } else {
          finalResults.push(0);
        }
      }
      this.lineChartData = [
        { data: finalResults, label: 'Chiffre d\'affaire par mois (€)' }
      ];
    });
  }

  initDataSource(): void {
    if (this.keyWord === this.indicatorUsers) {
        this.users.map((user: any) => {
            const obj = {
                user,
                id: user.id,
                lastName: user.lastname,
                firstName: user.firstname,
                mail: user.mail
            };
            this.source.push(obj);
        });
    } else if (this.keyWord === this.indicatorValidateOrder) {
        this.validateOrders.map((vo: any) => {
            const obj = {
                vo,
                commande: vo.order.id,
                date: formatDateToWeb(vo.order.inserted_at, 'dd/MM/yyyy'),
                statut: vo.order.status?.name,
                prix: vo.order.price + ' €'
            };
            this.source.push(obj);
        });
    } else if (this.keyWord === this.indicatorStockedProducts) {
        this.stockedItems.map((item: any) => {
            const materials = item.materials.map((material: any) => {
                return  ' ' + material.name;
              });
            let itemName = '';
            if (item.name === 'Kena') {
              itemName = item.name + materials[1];
            } else {
              itemName = item.name;
            }
            const obj = {
                item,
                name: itemName,
                type: item?.item_type?.name,
                materials: materials.toString(),
                price: item.price + ' €',
                stock: item.stock
                };
            this.source.push(obj);
        });
    } else if (this.keyWord === this.indicatorCancelledOrders) {
        this.cancelledOrders.map((co: any) => {
            const obj = {
                co,
                commande: co.order.id,
                date: formatDateToWeb(co.order.inserted_at, 'dd/MM/yyyy'),
                statut: co.order.status?.name,
                prix: co.order.price + ' €'
            };
            this.source.push(obj);
        });
    } else if (this.keyWord === this.indicatorUnstockedProducts) {
        this.unstockedItems.map((item: any) => {
            const materials = item.materials.map((material: any) => {
                return  ' ' + material.name;
              });
            let itemName = '';
            if (item.name === 'Kena') {
              itemName = item.name + materials[1];
            } else {
              itemName = item.name;
            }
            const obj = {
                item,
                name: itemName,
                type: item?.item_type?.name,
                materials: materials.toString(),
                price: item.price + ' €',
                stock: item.stock
                };
            this.source.push(obj);
        });
    } else if (this.keyWord === this.indicatorOrdersToPrepare) {
      this.ordersToPrepare.map((op: any) => {
        const obj = {
          op,
          commande: op.id,
          date: formatDateToWeb(op.inserted_at, 'dd/MM/yyyy'),
          statut: op.status?.name,
          prix: op.price + ' €'
        };
        this.source.push(obj);
      });
    }
  }

  openOrderCardDialog(row: any, key: string): void {
    const modalRef = this.modalService.open(OrderDetailsComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.commande = row;
    modalRef.componentInstance.key = key;
    modalRef.result.then(
      () => {
        // Left blank intentionally, nothing to do here
      },
      () => {
        // Left blank intentionally, nothing to do here
      }
    );
  }

  openUserViewDialog(row: any): void {
    const modalRef = this.modalService.open(UserDetailsComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.u = row;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.deleteUserName = result;
          this.deleteUserSuccess = true;
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
        // Left blank intentionally, nothing to do here
      },
      () => {
        // Left blank intentionally, nothing to do here
      }
    );
  }

  openProductViewDialog(row: any): void {
    const modalRef = this.modalService.open(ProductDetailsComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.product = row;
    modalRef.result.then(
      () => {
        // Left blank intentionally, nothing to do here
      },
      () => {
        // Left blank intentionally, nothing to do here
      }
    );
  }

  openProductUpdateDialog(row: any): void {
    const modalRef = this.modalService.open(ProductUpdateComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.product = row;
    modalRef.result.then(
      (result) => {
        if (result.includes('delete')) {
          this.deleteItemSuccess = true;
          setTimeout(() => {  window.location.reload(); }, 700);
        } else if (result === 'updated') {
          this.updateItemSuccess = true;
          setTimeout(() => {  window.location.reload(); }, 700);
        }
      },
      () => {
        // Left blank intentionally, nothing to do here
      }
    );
  }
  cancel(): void {
    this.activeModal.close();
  }

}
