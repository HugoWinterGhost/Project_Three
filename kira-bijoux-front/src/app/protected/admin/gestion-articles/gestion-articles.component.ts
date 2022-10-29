import { Component, OnInit } from '@angular/core';
import { SecuService } from 'src/app/shared/services/secu/secu.service';
import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ButtonViewComponent } from 'src/app/shared/components/button-view/button-view.component';
import { ButtonUpdateComponent } from 'src/app/shared/components/button-view/button-update.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleUpdateComponent } from './article-update/article-update.component';

@Component({
  selector: 'app-gestion-articles',
  templateUrl: './gestion-articles.component.html',
  styleUrls: ['./gestion-articles.component.scss']
})
export class GestionArticlesComponent implements OnInit {

  source: any;
  settings: any;

  constructor(
    private cookieService: SecuService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.cookieService.verifyAccess('admin');
    this.initSettings();
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
        code: {
          title: 'Code',
          filter: false,
          sort: true
        },
        titre: {
          title: 'Titre',
          filter: false,
          sort: true
        },
        appartenance: {
          title: 'Appartenance',
          filter: false,
          sort: true
        },
        upd_date: {
          title: 'Modifié le',
          filter: false,
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
              this.openArticleViewDialog(row);
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
              this.openArticleUpdateDialog(row);
            });
          }
        }
      }
    };
    this.initDataSource();
  }

  initDataSource(): void {
    this.source = [
      {
        code: 'BLOG-20-07-2021',
        titre: 'La labradorite, une pierre remarquable',
        appartenance: 'Blog',
        upd_date: '20-07-2021'
      },
      {
        code: 'BLOG-19-07-2021',
        titre: 'La pierre de lune se recharge-t-elle réellement à la lumière de la lune ?',
        appartenance: 'Blog',
        upd_date: '19-07-2021'
      },
      {
        code: 'GENERAL-06-11-2020',
        titre: 'Mentions légales',
        appartenance: 'Mention légales',
        upd_date: '06-11-2020'
      }
    ];
  }

  openArticleViewDialog(row: any): void {
    const modalRef = this.modalService.open(ArticleDetailsComponent, {
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

  openArticleUpdateDialog(row: any): void {
    const modalRef = this.modalService.open(ArticleUpdateComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.product = row;
    modalRef.result.then(
      (result: any) => {
        // Left blank intentionally, nothing to do here
      },
      () => {
        // Left blank intentionally, nothing to do here
      }
    );
  }

}
