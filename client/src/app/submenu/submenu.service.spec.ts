import { TestBed, inject } from '@angular/core/testing';

import { SubmenuService } from './submenu.service';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";

describe('SubmenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SubmenuService, MessageService ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([SubmenuService], (service: SubmenuService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all submenus', inject([SubmenuService], (service: SubmenuService) => {
    expect(service.getSubmenus).toBeTruthy();
  }));

  it('should get single submenu by ID', inject([SubmenuService], (service: SubmenuService) => {
    expect(service.getSubmenu('it does not exist')).toBeTruthy();
  }));

  it('should create a submenu', inject([SubmenuService], (service: SubmenuService) => {
    expect(service.createSubmenu({
      name: 'karma-test-submenu',
      sequence: 12312312312321,
      url: 'karma-test-submenu-url',
      translations: [],
    })).toBeTruthy();
  }));

  it('should remove a submenu', inject([SubmenuService], (service: SubmenuService) => {
    expect(service.removeSubmenuByName('karma-test-submenu')).toBeTruthy();
  }));

});
