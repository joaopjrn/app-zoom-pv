import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "@auth0/auth0-angular";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErroComponent } from "./componentes/snackbars/erro/erro.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar, private authSvc: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.erro.code)
        let errorMsg = 'Um erro desconhecido aconteceu!';
        if(error.error.msg){
          errorMsg = error.error.msg;
        }
        if(error.error.erro.code === 1005){
          this.authSvc.logout();
        }
        this.snackbar.openFromComponent(ErroComponent, { data: {msg: errorMsg, tipo: 'erro'}, duration: 2000 });
        return EMPTY;
      })
    );
  }

}
