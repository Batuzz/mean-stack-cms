import { TestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { MessageService } from "primeng/components/common/messageservice";
import { HttpClientModule } from "@angular/common/http";

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ MenuService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all menus', inject([MenuService], (service: MenuService) => {
    expect(service.getMenus).toBeTruthy();
  }));

  it('should get single menu by ID', inject([MenuService], (service: MenuService) => {
    expect(service.getMenu('it does not exist')).toBeTruthy();
  }));

  it('should create a menu', inject([MenuService], (service: MenuService) => {
    expect(service.createMenu({
      name: 'karma-test-menu',
      sequence: 1321123132132,
      url: 'karma-test-menu-url',
      translations: [],
      submenus: [],
    })).toBeTruthy();
  }));

  it('should remove a menu', inject([MenuService], (service: MenuService) => {
    expect(service.removeMenuByName('karma-test-menu')).toBeTruthy();
  }));
});
