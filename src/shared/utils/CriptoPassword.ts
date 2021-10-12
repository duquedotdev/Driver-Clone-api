import * as Crypto from 'crypto';

export function EncryptPass(arg: string) {
  const encriptPass = Crypto.createHash('sha1').update(arg).digest('hex');
  return encriptPass;
}
