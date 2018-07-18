import { Component, OnInit } from '@angular/core';
import { Image } from "../image.interface";
import { ImageService } from "../image.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  public images: Image[];

  constructor(
    private imageService: ImageService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.imageService.getImages()
      .subscribe(
        images => this.images = images,
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting images. Please try again.'
          })
      )
  }

}
