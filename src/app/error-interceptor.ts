import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErroComponent } from "./componentes/snackbars/erro/erro.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Um erro desconhecido aconteceu!';
        if(error.error.msg){
          errorMsg = error.error.msg;
        }
        this.snackbar.openFromComponent(ErroComponent, { data: {msg: errorMsg, tipo: 'erro'}, duration: 2000 });
        return EMPTY;
      })
    );
  }

}
