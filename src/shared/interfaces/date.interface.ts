import { FindOperator } from 'typeorm';

export interface ExtendedDate extends Date {
  $gte: (date: Date) => FindOperator<Date>;
  $lt: (date: Date) => FindOperator<Date>;
}
