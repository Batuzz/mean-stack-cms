import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/components/common/messageservice";
import { SectionService } from "../section.service";
import { Section } from "../section.interface";

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {

  public sections: Section[];

  constructor(
    private messageService: MessageService,
    private sectionService: SectionService
  ) { }

  ngOnInit() {
    this.sectionService.getSections()
      .subscribe(
        sections => {
          this.sections = sections;
        },
        () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'An error occurred while getting sections. Please try again.'
          })
      );
  }

  public removeSection(id: string) {
    //this.sectionService.removeSection(id);
  }

}
