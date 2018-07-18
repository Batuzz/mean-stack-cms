import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Menu } from "../menu.class";
import { TranslationService } from "../../translation/translation.service";
import { MenuService } from "../menu.service";
import { Translation } from "../../translation/translation.interface";
import { SubmenuService } from "../../submenu/submenu.service";
import { Submenu } from "../../submenu/submenu.interface";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-menu-new',
  templateUrl: './menu-new.component.html',
  styleUrls: ['./menu-new.component.scss', '../../../assets/forms.scss']
})
export class MenuNewComponent implements OnInit {
  public menu: Menu = new Menu();
  public translations: Translation[];
  public menuForm: FormGroup;
  public submenus: Submenu[];
  public selectedTranslations: any[] = [];
  public selectedSubmenus: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public ts: TranslationService,
    private menuService: MenuService,
    private submenuService: SubmenuService,
    private messageService: MessageService
  ) {
    this.menuForm = formBuilder.group({
      name: [ null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      sequence: [ null, [
        Validators.required,
        Validators.min(1)
      ]],
      url: [ null, [
        Validators.required,
      ]],
    });
    this.ts.getTranslations()
      .subscribe(
        translations => this.translations = translations,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting translations. Please try again.'
          })
      );
    this.submenuService.getSubmenus()
      .subscribe(
        submenus => this.submenus = submenus,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting submenus. Please try again.'
          })
      )
  }

  ngOnInit() { }

  public createMenu(value: any) {
    if(!this.menuForm.valid)
      return;

    this.menu.name = value.name;
    this.menu.sequence = value.sequence;
    this.menu.url = value.url;
    this.menu.translations = this.selectedTranslations;
    this.menu.submenus = this.selectedSubmenus;

    this.menuService.createMenu(this.menu);
  }

}

