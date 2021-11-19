import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.component.html',
  styleUrls: ['./conversa.component.css']
})
export class ConversaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enviar(form: NgForm){
    console.log(form.value.msg)
  }

}
