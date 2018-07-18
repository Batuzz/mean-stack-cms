import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/components/common/messageservice";
import {Message} from "primeng/api";

@Component({
  selector: 'app-growl-messages',
  templateUrl: './growl-messages.component.html',
  styleUrls: ['./growl-messages.component.scss']
})
export class GrowlMessagesComponent implements OnInit {

  public messages: Message[] = [];

  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit() { }

}
