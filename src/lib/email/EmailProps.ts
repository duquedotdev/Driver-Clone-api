import TemplateProps from '@lib/templates/TemplateProps';

interface IMailContent {
  name: string;
  email: string;
}

export default class SendMailProps {
  to: IMailContent;

  from?: IMailContent;

  subject: string;

  templateData: TemplateProps;
}
