import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseEnumPipe<T> implements PipeTransform<string, T | undefined> {
  private readonly enumObj: Record<string, T>;

  constructor(enumObj: Record<string, T>) {
    this.enumObj = enumObj;
  }

  transform(value: string, metadata: ArgumentMetadata): T | undefined {
    if (!value) {
      return undefined;
    }

    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue) || numericValue < 0) {
      throw new BadRequestException(`Invalid ${metadata.data} value`);
    }

    const enumKey = Object.keys(this.enumObj).find(
      (key) => this.enumObj[key] === numericValue,
    );

    if (!enumKey) {
      throw new BadRequestException(`Invalid ${metadata.data} value`);
    }

    const enumValue = this.enumObj[enumKey];
    return enumValue;
  }
}
