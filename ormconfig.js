const isDevelopment = process.env.NODE_ENV === 'development';

const connection = {
  url: process.env.DB_URL || process.env.DATABASE_URL,
  host: process.env.DB_COMPOSE_HOST || process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGGING_LEVEL ? process.env.DB_LOGGING_LEVEL.split(',') : undefined,

  entities: [`./${isDevelopment ? 'src' : 'dist'}/database/entities/*{.ts,.js}`],

  migrations: [`./${isDevelopment ? 'src' : 'dist'}/database/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `./${isDevelopment ? 'src' : 'dist'}/database/migrations`,
  },
};

if (process.env.DB_SSL === 'true') {
  connection.ssl = { rejectUnauthorized: false };
}

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    ...connection,

  },
  {
    name: 'seed',
    type: 'postgres',
    ...connection,
    migrations: [`./${isDevelopment ? 'src' : 'dist'}/database/seeds/*{.ts,.js}`],
    cli: {
      migrationsDir: `./${isDevelopment ? 'src' : 'dist'}/database/seeds`,
    },
  },
];
