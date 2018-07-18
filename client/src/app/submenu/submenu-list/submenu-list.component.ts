import { Component, OnInit } from '@angular/core';
import { SubmenuService } from "../submenu.service";
import { Submenu } from "../submenu.interface";
import {MessageService} from "primeng/components/common/messageservice";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-submenu-list',
  templateUrl: './submenu-list.component.html',
  styleUrls: ['./submenu-list.component.scss']
})
export class SubmenuListComponent implements OnInit {

  public submenus: Submenu[];
  public submenuFilter: string = '';
  public submenuURLFilter: string = '';
  public submenuControl = new FormControl();
  public submenuURLControl = new FormControl();

  constructor(
    private submenuService: SubmenuService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.submenuService.getSubmenus()
      .subscribe(
        submenus => {
          this.submenus = submenus;
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting submenus. Please try again.'
          })
      )
  }


  public removeSubmenu(id: string) {
    for(let element of this.submenus) {
      this.submenus = this.submenus.filter(obj => obj._id != id);
    }
    this.submenuService.removeSubmenu(id);
  }

}
