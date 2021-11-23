import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Mensagem } from 'src/app/models/mensagem.model';
import getVideoId from 'get-video-id';

@Component({
  selector: 'app-item-mensagem',
  templateUrl: './item-mensagem.component.html',
  styleUrls: ['./item-mensagem.component.css']
})
export class ItemMensagemComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  @Input() msg: Mensagem;
  @Input() idUsuarioLogado: string;
  horario: string;

  isImg: boolean = false;
  isYt: boolean = false;
  isLink: boolean = false;
  videoId: string;
  ytUrl;
  imgUrl;
  link;

  // rxyt = new RegExp(/(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g);
  rximg = new RegExp(/(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.bmp|\.gif|\.jpeg))/g);
  rxurl = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);


  ngOnInit(): void {
    this.horario = new Date(this.msg.createdAt).toLocaleTimeString().slice(0,5);
    this.checarMsg();
  }

  checarMsg(){
    // let yt = this.rxyt.exec(this.msg.conteudo);
    // if(yt){
    //   if(yt[2] || yt[6]) {
    //     if(yt[2]) this.videoId = yt[2].slice(1)
    //     if(yt[6]) this.videoId = yt[6].slice(1)
        
    //   }else if(yt[1]){
    //     this.videoId = yt[1].slice(2)
    //   }
    //   this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.videoId);
    //   console.log(this.ytUrl)
    //   this.isYt = true;
    //   return;
    // }
    // const msgArray = this.msg.conteudo.split(' ');
    // msgArray.forEach(item => {

    // })
    let yt = getVideoId(this.msg.conteudo).id;
    if(yt){
      this.videoId = yt;
      this.ytUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.videoId);
      this.isYt = true;
      return;
    }

    let img = this.rximg.exec(this.msg.conteudo);
    if(img){
      this.imgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(img[0]);
      this.isImg = true;
      return;
    }

    let url = this.rxurl.exec(this.msg.conteudo);
    if(url){
      this.link = url.input;
      this.isLink = true;
      return;
    }
  }

}
