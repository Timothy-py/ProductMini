import Joi, { ObjectSchema } from "joi";

const validator = (schema: ObjectSchema) => (payload: any) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
    ),
  role: Joi.string().valid("SHOP_OWNER", "USER"),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
    ),
});

const createStoreSchema = Joi.object({
  name: Joi.string().required(),
  one_line_pitch: Joi.string().optional(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  address: Joi.string().required(),
  other_details: Joi.string().optional(),
});

const editStoreSchema = Joi.object({
  name: Joi.string().optional(),
  one_line_pitch: Joi.string().optional(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  address: Joi.string().optional(),
  other_details: Joi.string().optional(),
});

export const validateSignup = validator(signupSchema);
export const validateSignin = validator(signinSchema);
export const validatecreateStore = validator(createStoreSchema);
export const validateEditStore = validator(editStoreSchema);
