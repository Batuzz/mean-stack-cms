import { Component, OnInit } from '@angular/core';
import { MenuService } from "../menu.service";
import { FormControl } from "@angular/forms";
import { Menu } from "../menu.interface";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  public menus: Menu[];
  public menuFilter: string = '';
  public menuURLFilter: string = '';
  public menuControl = new FormControl();

  constructor(
    private menuService: MenuService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.menuService.getMenus()
      .subscribe(
        menus => {
          this.menus = menus;
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting menus. Please try again.'
          })
      );
  }

  public removeMenu(id: string) {
    for(let element of this.menus) {
      this.menus = this.menus.filter(obj => obj._id != id);
    }
    this.menuService.removeMenu(id);
  }
}
