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
        const apiReq = req.clone({ url: `${req.url+environment.api}` });
        return next.handle(apiReq);
    }
}
