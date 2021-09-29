import { COMPANY_NAME, SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_SECURE, SMTP_USER } from '@config/env';

import nodemailer, { Transporter } from 'nodemailer';
import { Inject, Service } from 'typedi';

import { HttpStatus, HttpStatusError } from '@shared/errors';

import Templates from '@lib/templates/Templates';
import EmailProps from './EmailProps';

@Service()
export default class EtherealMailProvider {
  private client: Transporter;

  @Inject()
  private templateProvide: Templates;

  public async sendMail({ to, from, subject, templateData }: EmailProps): Promise<void> {
    const transport = await nodemailer.createTestAccount();

    if (transport instanceof Error) {
      throw new HttpStatusError(HttpStatus.INTERNAL_SERVER_ERROR, 'Não foi possível conectar ao servidor de e-mail.');
    }

    const account = await nodemailer.createTransport({
      host: SMTP_HOST ?? transport.smtp.host,
      port: Number(SMTP_PORT) ?? transport.smtp.port,
      secure: SMTP_SECURE ? false : transport.smtp.secure,
      auth: {
        user: SMTP_USER ?? transport.user,
        pass: SMTP_PASS ?? transport.pass,
      },
    });

    if (account instanceof Error) {
      throw new HttpStatusError(HttpStatus.INTERNAL_SERVER_ERROR, 'Não foi possível conectar ao servidor de e-mail.');
    }

    this.client = account;

    const message = await this.client.sendMail({
      from: {
        name: from?.name ?? COMPANY_NAME,
        address: from?.email ?? transport.user,
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.templateProvide.parse(templateData),
    });

    return console.log('Message sent: %s', message.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
