import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MenuService } from "../menu.service";
import { Menu } from "../menu.interface";
import { TranslationService } from "../../translation/translation.service";
import { LanguageService } from "../../language/language.service";
import { User } from "../../user/user.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { FormControl } from "@angular/forms";
import { Submenu } from "../../submenu/submenu.interface";


@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.scss']
})
export class MenuViewComponent implements OnInit {

  public submenus: Submenu[];
  public menus: Menu[];
  public languages: any[];
  public language: any;
  public selectedLanguage: any;
  public user: User;
  public formControl: FormControl = new FormControl();


  constructor(
    private menuService: MenuService,
    private languageService: LanguageService,
    public ts: TranslationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.language = localStorage.getItem('language');
    this.menuService.getMenus()
      .subscribe(
        menus => {
          this.menus = menus;
        },
        () => {
          if(localStorage.getItem('user'))
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while getting menus'
            })
        });
    this.languageService.getLanguages()
      .subscribe(
        languages => {
          this.languages = [];
          for(let language of languages) {
            this.languages.push({
              label: language.name,
              iso: language.iso,
              value: language._id,
            });
            if(language.iso == this.language)
              this.selectedLanguage = language._id;
          }
          if(!this.selectedLanguage)
            this.selectedLanguage = languages[0]._id;
        },
        () => {
          if(localStorage.getItem('user'))
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while getting languages'
            })
        });
    if(localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'));
  }

  public logout() {
    localStorage.removeItem('user');
    location.reload(true);
  }

  public open(){
    document.getElementById("menuTable").setAttribute("style", "display: table; animation-name: open; animation-fill-mode: forwards; animation-duration: 1.5s;");
    setTimeout(function(){
      //document.getElementById("menuTable").setAttribute("style", "display: table;");
      var all = document.getElementsByClassName('navelement');
      for (var i = 0; i < all.length; i++) {
        all[i].setAttribute("style","color: white");
      }
      document.getElementById("profilove").setAttribute("style", "display: block;");
    },900);
  }

  public close(){
    document.getElementById("menuTable").setAttribute("style", "display: none;");
    var all = document.getElementsByClassName('navelement');
    for (var i = 0; i < all.length; i++) {
      all[i].setAttribute("style","color: transparent;");
    }
    document.getElementById("profilove").setAttribute("style", "display: none;");
  }

  public drop(id){
    if(id == -1)
      return;
    document.getElementById(id).classList.toggle('show');
  }


  public setLanguage() {
    for(let lang of this.languages) {
      if(lang.value == this.selectedLanguage) {
        localStorage.setItem('language', lang.iso);
        location.reload(true);
      }
    }
  }
}
