import * as Joi from 'joi';

export const environmentValidation = Joi.object({
  PORT: Joi.number().default(3000),
  CORS_ORIGIN: Joi.string().default('http://localhost:4200'),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
