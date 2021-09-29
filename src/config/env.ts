import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const {
  NODE_ENV,
  SERVER_URL,
  COMPANY_NAME,
  TOKEN_SECRET,
  TOKEN_EXPIRY,
  BLOCK_DURATION_IN_MINUTES,
  INTERVAL_IN_SECONDS,
  MAXIMUM_ATTEMPTS,

  DB_TYPE,

  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
} = process.env;

const NODE_VERSION = process.versions.node;

const SERVER_PORT = Number(process.env.SERVER_PORT || process.env.PORT);

export {
  COMPANY_NAME,
  NODE_ENV,
  NODE_VERSION,
  SERVER_URL,
  SERVER_PORT,
  TOKEN_SECRET,
  TOKEN_EXPIRY,
  BLOCK_DURATION_IN_MINUTES,
  INTERVAL_IN_SECONDS,
  MAXIMUM_ATTEMPTS,
  DB_TYPE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
};
