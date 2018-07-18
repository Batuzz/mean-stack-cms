import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubmenuService } from "../submenu.service";
import { Submenu } from "../submenu.interface";
import { Subscription } from "rxjs/Subscription";
import { Translation } from "../../translation/translation.interface";
import { TranslationService } from "../../translation/translation.service";
import { MessageService } from "primeng/components/common/messageservice";


@Component({
  selector: 'app-submenu-detail',
  templateUrl: './submenu-detail.component.html',
  styleUrls: ['../../../assets/forms.scss', './submenu-detail.component.scss']
})
export class SubmenuDetailComponent implements OnInit {

  public selectedTranslations: any[];
  public id: string;
  public submenu: Submenu;
  public translations: Translation[];
  public submenuForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private submenuService: SubmenuService,
    private translationService: TranslationService,
    private messageService: MessageService,

  ) {
    this.submenuForm = formBuilder.group({
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
        this.translationService.getTranslations()
          .subscribe(
            translations => {
              this.submenuService.getSubmenu(this.id)
                .subscribe(
                  submenu => {
                    this.submenu = submenu;

                    this.selectedTranslations = submenu.translations;
                    if (this.selectedTranslations && this.selectedTranslations.length)
                      for (let trans of this.selectedTranslations) {
                        translations = translations.filter(obj => obj._id != trans._id);
                      }
                    this.translations = translations;

                    this.submenuForm.setValue({
                      name: submenu.name,
                      sequence: submenu.sequence,
                      url: submenu.url
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
        this.submenuService.getSubmenu(this.id)
          .subscribe(
            submenu => {
              this.submenu = submenu;
              this.submenuForm.setValue({
                name: submenu.name,
                sequence: submenu.sequence,
                url: submenu.url,
              });
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting submenus. Please try again.'
              })
          );
      });

  }

  public updateSubmenu(values: any) {
    if(!this.submenuForm.valid)
      return;

    this.submenu._id = this.id;
    this.submenu.name = values.name;
    this.submenu.sequence = values.sequence;
    this.submenu.url = values.url;
    this.submenu.translations = this.selectedTranslations;

    this.submenuService.updateSubmenu(this.submenu);
  }

}
