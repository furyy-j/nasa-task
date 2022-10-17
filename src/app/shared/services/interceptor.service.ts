import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // this.headers.append('Access-Control-Allow-Methods');
        const apiReq = req.clone({
            url: `${req.url + environment.api}`,
            // setHeaders: {
            //   'Access-Control-Allow-Origin': '*',
            //   'Cross-Origin-Opener-Policy': '*',
            //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            // },
        });

        return next.handle(apiReq,);
    }
}
