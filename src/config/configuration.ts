// ConfigService
export default () => ({
    app: {
      port: parseInt(process.env.PORT, 10) || 3000,
      corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    },
    database: {
      mongoUri: process.env.MONGO_URI,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  });
  