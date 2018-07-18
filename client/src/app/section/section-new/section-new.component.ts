import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/components/common/messageservice";
import { Translation } from "../../translation/translation.interface";
import { Section } from "../section.class";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslationService } from "../../translation/translation.service";
import { SectionService } from "../section.service";
import { ImageService } from "../../image/image.service";
import { Image } from "../../image/image.interface";

@Component({
  selector: 'app-section-new',
  templateUrl: './section-new.component.html',
  styleUrls: ['./section-new.component.scss', '../../../assets/forms.scss']
})
export class SectionNewComponent implements OnInit {

  public translations: Translation[];
  public selectedTranslations: any[] = [];
  public images: any[] = [];
  public selectedImage: Image;
  public formControl: FormControl = new FormControl();
  public section: Section = new Section();
  public sectionForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private translationService: TranslationService,
    private formBuilder: FormBuilder,
    private sectionService: SectionService,
    private imageService: ImageService
  ) {
    this.sectionForm = formBuilder.group({
      name: [ null, [
        Validators.required
      ]],
      sequence: [ null, [
        Validators.min(1)
      ]],
    });
    this.translationService.getTranslations()
      .subscribe(
        translations => {
          this.translations = translations;
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting translations. Please try again.'
          })
      );
    this.imageService.getImages()
      .subscribe(
        images => {
          for(let image of images) {
            this.images.push({
              label: this.translationService.trans(image.titles),
              url: image.url,
              value: image._id,
            })
          }
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting images. Please try again.'
          })
      );
  }

  ngOnInit() { }

  public createSection(value: any) {
    if(!this.sectionForm.valid || !this.selectedTranslations.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning!',
        detail: 'You have pick at least one translation and fill all the fields.'
      });
      return;
    }

    this.section.name = value.name;
    this.section.sequence = value.sequence;
    this.section.translations = this.selectedTranslations;
    this.section.image = this.selectedImage;

    this.sectionService.createSection(this.section);
  }

}
