import { Injectable } from '@nestjs/common';

type TemplateParameter = any[];

@Injectable()
export class UtilService {
  public template<T>(
    templateData: TemplateStringsArray,
    param: T[],
    delimiter = '\n',
  ): string {
    let output = '';
    for (let i = 0; i < param.length; i += 1) {
      output += templateData[i] + param[i];
    }
    output += templateData[param.length];

    const lines: string[] = output.split(/(?:\r\n|\n|\r)/);

    return lines
      .map((text: string) => text.replace(/^\s+/gm, ''))
      .join(delimiter)
      .trim();
  }

  public pre(
    templateData: TemplateStringsArray,
    ...param: TemplateParameter
  ): string {
    return this.template(templateData, param, '\n');
  }

  public line(
    templateData: TemplateStringsArray,
    ...param: TemplateParameter
  ): string {
    return this.template(templateData, param, ' ');
  }

  public removeUndefined<T extends object>(argv: T): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(argv).filter(
        ([, value]: [string, unknown]) => value !== undefined,
      ),
    );
  }
}
