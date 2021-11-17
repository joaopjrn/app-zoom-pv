import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.component.html',
  styleUrls: ['./bem-vindo.component.css']
})
export class BemVindoComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
