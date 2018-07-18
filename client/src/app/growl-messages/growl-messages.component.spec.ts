import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowlMessagesComponent } from './growl-messages.component';
import { GrowlModule } from "primeng/growl";
import { MessageService } from "primeng/components/common/messageservice";

describe('GrowlMessagesComponent', () => {
  let component: GrowlMessagesComponent;
  let fixture: ComponentFixture<GrowlMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowlMessagesComponent ],
      imports: [ GrowlModule ],
      providers: [ MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowlMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
