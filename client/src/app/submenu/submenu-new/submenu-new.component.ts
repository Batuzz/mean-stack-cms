import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Translation } from "../../translation/translation.interface";
import { SubmenuService } from "../submenu.service";
import { TranslationService } from "../../translation/translation.service";
import { Submenu } from "../submenu.class";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-submenu-new',
  templateUrl: './submenu-new.component.html',
  styleUrls: ['../../../assets/forms.scss', './submenu-new.component.scss']
})
export class SubmenuNewComponent implements OnInit {
  public submenu: Submenu;
  public translations: Translation[];
  public submenuForm: FormGroup;
  public selectedTranslations: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public ts: TranslationService,
    private submenuService: SubmenuService,
    private messageService: MessageService
  ) {
    this.submenu = new Submenu();
    this.submenuForm = formBuilder.group({
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
  }

  ngOnInit() { }

  public createSubmenu(value: any) {
    if(!this.submenuForm.valid)
      return;

    this.submenu.name = value.name;
    this.submenu.sequence = value.sequence;
    this.submenu.url = value.url;
    this.submenu.translations = this.selectedTranslations;

    this.submenuService.createSubmenu(this.submenu);
  }

}
