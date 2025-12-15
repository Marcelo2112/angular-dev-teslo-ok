import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";


export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const token = inject(AuthService).token();

  console.log({ token })

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`)
  });

  return next(newReq);

}
