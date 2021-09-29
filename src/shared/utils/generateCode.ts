import { randomInt } from 'crypto';

const GenCode = (start: number, end: number): string => {
  const genarateRandomCode = randomInt(start, end);
  const GenCode = genarateRandomCode.toString().padStart(6, '0');
  return GenCode;
};

export { GenCode };
