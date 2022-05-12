import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menuService/menu.service';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];
  constructor(private _menuService: MenuService, public auth: AuthService) { }

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu() {
    this._menuService.getMenu().subscribe(data => {
      console.log(data)
      this.menu=data
    })
  }
}