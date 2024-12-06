export type Configuration = ReturnType<typeof getSettings>;

const getSettings = () => ({
  app: {
    PORT: Number.parseInt(process.env.PORT),
  },
  db: {
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number.parseInt(process.env.DB_PORT),
    DB_TYPE: process.env.DB_TYPE,
    USERNAME: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },
});

export default getSettings;
