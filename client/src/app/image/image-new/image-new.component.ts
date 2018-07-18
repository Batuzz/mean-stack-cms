import { Component, OnInit } from '@angular/core';
import { TranslationService } from "../../translation/translation.service";
import { ImageService } from "../image.service";
import { Translation } from "../../translation/translation.interface";
import { Image } from "../image.class";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../../_helpers/app.settings";


@Component({
  selector: 'app-image-new',
  templateUrl: './image-new.component.html',
  styleUrls: ['./image-new.component.scss', '../../../assets/forms.scss']
})
export class ImageNewComponent implements OnInit {

  private imageURL: string;
  private image: Image = new Image();
  public translations: Translation[];
  public selectedDescriptions: any[] = [];
  public selectedTitles: any[] = [];
  public apiEndpoint = AppSettings.API_ENDPOINT + 'upload';

  constructor(
    private ts: TranslationService,
    private imageService: ImageService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.ts.getTranslations()
      .subscribe(
        translations => this.translations = translations,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting translations. Please try again.'
          })
      )
  }

  public onBasicUpload(event: any) {
    this.imageURL = event.xhr.response;

    this.image.url = this.imageURL;
    this.image.descriptions = this.selectedDescriptions;
    this.image.titles = this.selectedTitles;

    this.imageService.createImage(this.image);
  }

}
