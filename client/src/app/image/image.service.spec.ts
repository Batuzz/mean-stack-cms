import { TestBed, inject } from '@angular/core/testing';

import { ImageService } from './image.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ImageService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all images', inject([ImageService], (service: ImageService) => {
    expect(service.getImages).toBeTruthy();
  }));

  it('should get single image by ID', inject([ImageService], (service: ImageService) => {
    expect(service.getImage('aa')).toBeTruthy();
  }));

  it('should create image', inject([ImageService], (service: ImageService) => {
    expect(service.createImage({
      url: 'karma-test-url',
      descriptions: [],
      titles: []
    })).toBeTruthy();
  }));

  it('should remove image', inject([ImageService], (service: ImageService) => {
    expect(service.removeImageByURL('karma-test-url')).toBeTruthy();
  }));

});
