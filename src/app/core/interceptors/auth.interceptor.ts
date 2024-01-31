import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}


    // On clone la requête et au clone on lui ajoute juste un header avec le token issu de la fonction getToken du service auth
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders()
            .append('Authorization', `Bearer ${this.auth.getToken()}`)
        const modifiedReq = req.clone({ headers })    
        return next.handle(modifiedReq);
    }
}