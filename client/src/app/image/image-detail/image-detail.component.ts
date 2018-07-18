import { Component, OnInit } from '@angular/core';
import { Image } from "../image.interface";
import { Translation } from "../../translation/translation.interface";
import { ImageService } from "../image.service";
import { TranslationService } from "../../translation/translation.service";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../../_helpers/app.settings";

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss', '../../../assets/forms.scss']
})
export class ImageDetailComponent implements OnInit {

  public id: string;
  private imageURL: string;
  private image: Image;
  public translations: Translation[];
  public selectedDescriptions: any[];
  public selectedTitles: any[];
  public apiEndpoint = AppSettings.API_ENDPOINT + 'upload';


  constructor(
    private route: ActivatedRoute,
    private ts: TranslationService,
    private imageService: ImageService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params['id'];
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
        this.imageService.getImage(this.id)
          .subscribe(
            image => {
              this.selectedTitles = [];
              this.selectedDescriptions = [];

              this.image = image;
              this.imageURL = image.url;
              this.selectedDescriptions = image.descriptions;
              this.selectedTitles = image.titles;
            },
            () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'An error occurred while getting image. Please try again.'
              })
          );
      });
  }

  public onBasicUpload(event: any) {
    this.imageURL = null;
    this.imageURL = event.xhr.response;

    this.image._id = this.id;
    this.image.url = this.imageURL;
    this.image.descriptions = this.selectedDescriptions;
    this.image.titles = this.selectedTitles;
  }

  public updateImage() {

    /*if(!this.imageForm.valid)
      this.messageService.add({
        severity: 'warn',
        summary: 'Caution!',
        detail: 'Form is not valid. Please fill it in properly.'
      });*/

    this.image._id = this.id;
    this.image.descriptions = this.selectedDescriptions;
    this.image.titles = this.selectedTitles;

    this.imageService.updateImage(this.image);
  }

}
