import { PipeTransform, Pipe } from '@angular/core';
import {TranslationService} from "../translation/translation.service";
import {isString} from "util";

@Pipe({
  name:'trans'
})

export class TranslationPipe implements PipeTransform {

  constructor(private ts: TranslationService) { }

  transform(value: any): any {
    if(isString(value))
      return this.ts.translateByName(value);
    else
      return this.ts.trans(value);
  }

}
