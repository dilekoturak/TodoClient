import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment',
  pure: false
})
export class MomentPipe implements PipeTransform {

  transform(value: string, dateFormat: string): any {
    return value ? moment(value).format(dateFormat) : null;
  }

}
