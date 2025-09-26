import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const assignmentValidation = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  dueDate: Joi.date().greater("now").required(), 
  status: Joi.string().valid("Draft", "Published", "Completed").default("Draft"),
});

export const submissionValidation = Joi.object({
  answer: Joi.string().min(5).required(),
});