import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'any',
})
export class httpInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService, private app: AppComponent) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('req', req);

    this.spinner.show();

    // var newRq;
    // // if (
    // //   req.url.search('AIzaSyDJlf-oThEnEX8ezsaLM1EOa7luVvV3bz8') == -1 &&
    // //   req.url.search('https://geoanalytics.mapmyindia.com/listingapi') == -1
    // // ) {
    // //   newRq = req.clone({
    // //     headers: req.headers.set('Authorization', `Bearer ${token.token}`),
    // //   });
    // // } else {
    // //   console.log('mapmyindia11111', req.url);
    // //   newRq = req;
    // // }
    // newRq = req;

    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log('event', event);
            this.spinner.hide();
            if (event.body.message != null) {
              this.app.toastMessage('success', 'success', event.body.message);
            }

            //   setTimeout(() => {
            //     this.spinner.hide();
            //   }, 1000);
            //   console.log('event.body.message', event.body.message);
            //   console.log('event.body.success', event.body.success);
            //   if (
            //     (event.body.message != undefined &&
            //       event.body.success == undefined) ||
            //     event.body.success == true
            //   ) {
            //     this.app.toastMessage('success', 'success', event.body.message);
            //   }
            //   if (
            //     event.body.message != undefined &&
            //     event.body.success == false
            //   ) {
            //     this.app.toastMessage('info', 'Information', event.body.message);
            //   }
            //   // if (event.body.message != undefined) {
            //   //   this.app.toastMessage('success', 'success', event.body.message);
            //   // }
          }
        },
        (error) => {
          this.spinner.hide();

          console.log('intercepor error', error);
          this.app.toastMessage('error', 'error', error.error.message);
          // console.log(
          //   'intercepor error',
          //   error.error.message == 'Unauthenticated.'
          // );
          // if(error.error.message == 'Unauthenticated.'){
          //   window.location.href='http://accounts.valluriorg.com/'
          //   // window.location.href='http://localhost:4300/'
          // }
        }
      )
    );
  }
}
