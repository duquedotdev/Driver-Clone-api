import fs from 'fs';
import handlebars from 'handlebars';
import { Service } from 'typedi';
import TemplateProps from './TemplateProps';

@Service()
export default class HandlebarsMailTemplate {
  public async parse({ file, variables }: TemplateProps): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
