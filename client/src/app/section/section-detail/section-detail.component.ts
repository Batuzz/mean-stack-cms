import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslationService } from "../../translation/translation.service";
import { ImageService } from "../../image/image.service";
import { MessageService } from "primeng/components/common/messageservice";
import { SectionService } from "../section.service";
import { Section } from "../section.interface";

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss', '../../../assets/forms.scss']
})
export class SectionDetailComponent implements OnInit {

  public id: string;
  public section: Section;
  public translations: any[];
  public selectedTranslations: any[];
  public images: any[];
  public selectedImage: any;
  public formControl: FormControl = new FormControl();
  public sectionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translationService: TranslationService,
    private imageService: ImageService,
    private messageService: MessageService,
    private sectionService: SectionService
  ) {
    this.sectionForm = formBuilder.group({
      name: [ null, [
        Validators.required
      ]],
      sequence: [ null, [
        Validators.min(1)
      ]],
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params['id'];
        this.translationService.getTranslations()
          .subscribe(
            translations => {
              this.sectionService.getSection(this.id)
                .subscribe(
                  section => {
                    this.section = section;
                    if(section.image)
                      this.selectedImage = section.image._id;
                    else
                      this.selectedImage = " ";

                    this.selectedTranslations = section.translations;
                    if(this.selectedTranslations && this.selectedTranslations.length)
                      for(let trans of this.selectedTranslations) {
                        translations = translations.filter(obj => obj._id != trans._id);
                      }
                    this.translations = translations;

                    this.sectionForm.setValue({
                      name: section.name,
                      sequence: section.sequence,
                    });
                  },
                  () =>
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error!',
                      detail: 'An error occurred while getting image. Please try again.'
                    })
                );
            },() =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting translations. Please try again.'
              })
          );


        this.imageService.getImages()
          .subscribe(
            images => {
              this.images = [];
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
      });
  }

  public updateSection(values: any) {
    if(!this.sectionForm.valid || !this.selectedTranslations.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning!',
        detail: 'You have pick at least one translation and fill all the fields.'
      });
      return;
    }

    this.section._id = this.id;
    this.section.name = values.name;
    this.section.sequence = values.sequence;
    this.section.translations = this.selectedTranslations;
    this.section.image = this.selectedImage;

    this.sectionService.updateSection(this.section);
  }

}
