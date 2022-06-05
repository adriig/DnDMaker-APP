import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DnDMaker-APP';


constructor() {

}

ngOnInit(): void {
  let bodyStyle = document.body.style;
  bodyStyle.backgroundImage = "url('../../../../../assets/files/characters.jpg')";
  bodyStyle.backgroundRepeat = "no-repeat"
  bodyStyle.backgroundAttachment = "fixed"
  bodyStyle.backgroundSize = "cover"
}

}