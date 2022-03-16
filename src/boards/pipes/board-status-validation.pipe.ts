import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`value isn't the status option`);
    }
    console.log('value', value); //statu랑 연결 -> body로 status값을 줬는데 반영이되었다.

    //status값은 public or private 만줘야한다 다른값은 에러가 나도록 구현한다.
    // readonly 외부에서 접근할수 있지만 값은 변경할수 없다.

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
