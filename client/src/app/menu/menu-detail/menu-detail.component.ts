import { Component, OnInit } from '@angular/core';
import { Menu } from "../menu.interface";
import { Translation } from "../../translation/translation.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from "@angular/router";
import { MenuService } from "../menu.service";
import { TranslationService } from "../../translation/translation.service";
import { SubmenuService } from "../../submenu/submenu.service";
import { Submenu } from "../../submenu/submenu.interface";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['../../../assets/forms.scss', './menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit {

  public id: string;
  public menu: Menu;
  public translations: Translation[];
  public menuForm: FormGroup;
  public submenus: Submenu[];
  private subscription: Subscription;
  public selectedTranslations: any[];
  public selectedSubmenus: any[];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    public ts: TranslationService,
    private submenuService: SubmenuService,
    private messageService: MessageService,
  ) {
    this.menuForm = formBuilder.group({
      name: [ null,[
        Validators.required
      ]],
      sequence:  [ null, [
        Validators.required,
        Validators.min(1)
      ]],
      url: [ null, [
        Validators.required
      ]],
    });
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params) => {
        this.id = params['id'];
        this.ts.getTranslations()
          .subscribe(
            translations => {
              this.menuService.getMenu(this.id)
                .subscribe(
                  menu => {
                    this.menu = menu;

                    if(menu.submenus) {
                      this.selectedSubmenus = menu.submenus;
                    } else {
                      this.selectedSubmenus = [];
                    }

                    this.selectedTranslations = menu.translations;
                    if (this.selectedTranslations && this.selectedTranslations.length)
                      for (let trans of this.selectedTranslations) {
                        translations = translations.filter(obj => obj._id != trans._id);
                      }
                    this.translations = translations;

                    this.menuForm.setValue({
                      name: menu.name,
                      sequence: menu.sequence,
                      url: menu.url
                    });
                  },
                  () =>
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error!',
                      detail: 'An error occurred while getting image. Please try again.'
                    })
                );
            }, () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting translations. Please try again.'
              })
          );
        this.menuService.getMenu(this.id)
          .subscribe(
            menu => {
              this.menu = menu;
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting menus. Please try again.'
              })
          );
        this.menuService.getMenu(this.id)
          .subscribe(
            menu => {
              this.menu = menu;
              this.menuForm.setValue({
                name: menu.name,
                sequence: menu.sequence,
                url: menu.url,
              });
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting menu. Please try again.'
              })
          );
        this.submenuService.getSubmenus()
          .subscribe(
            (submenus) => {
              this.submenus = submenus;
            }
          )
      });
  }


  public updateMenu(value: any) {
    if(!this.menuForm.valid)
      return;

    this.menu._id = this.id;
    this.menu.name = value.name;
    this.menu.sequence = value.sequence;
    this.menu.url = value.url;
    this.menu.translations = this.selectedTranslations;
    this.menu.submenus = this.selectedSubmenus;

    this.menuService.updateMenu(this.menu);
  }

}
