import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Image } from "./image.interface";
import { MessageService } from "primeng/components/common/messageservice";
import { AppSettings } from "../_helpers/app.settings";

@Injectable()
export class ImageService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  public createImage(image: any) {
    return this.http.post(
      AppSettings.API_ENDPOINT + "images",
      { image: image }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Image was successfully created.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while creating image. Please try again.'
        })
    );
  }

  public getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(
      AppSettings.API_ENDPOINT + "images"
    );
  }

  public getImage(id: string): Observable<Image> {
    return this.http.get<Image>(
      AppSettings.API_ENDPOINT + "images/" + id
    );
  }

  public updateImage(image: any) {
    return this.http.put(
      AppSettings.API_ENDPOINT + "images/" + image._id,
      { image: image }
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Image was successfully updated.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while updating image. Please try again.'
        })
    );
  }

  public removeImage(id: string) {
    this.http.delete(
      AppSettings.API_ENDPOINT + "images/" + id,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Image was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing image. Please try again.'
        })
    );
  }

  public removeImageByURL(url: string) {
    return this.http.delete(
      AppSettings.API_ENDPOINT + "images/url/" + url,
    ).subscribe(
      () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'Image was successfully removed.'
        }),
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'An error occurred while removing image. Please try again.'
        })
    );
  }
}
