import { Injectable, enableProdMode } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService,
        public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("Passou no interceptor");
        return next.handle(req).pipe(
            catchError((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;

                    default:
                    this.handleDefaultEror(errorObj);

                }

                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

                return Observable.throw(errorObj);
            })) as any;

    }
    handle403() {
        this.storage.setLocalUser(null);
    }
    async handle401() {
            const alert = await this.alertCtrl.create({
              header: 'Erro 401: Falha na autenticação!',
              message: 'Email ou senha incorretos!!',
              backdropDismiss: false,
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    console.log('Escolheu Cancelar');
                  }
                }, {
                  text: 'OK',
                  handler: () => {
                    console.log('Escolheu OK');
                  }
                }
              ]
            });
        
            await alert.present();
    }

   async handleDefaultEror(errorObj) {
        let alert = await this.alertCtrl.create({
            subHeader: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            backdropDismiss: true,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        await alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};