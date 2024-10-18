import joi from "joi";
const user_schema = joi.object({ email: joi.string().email().required(), registration_code: joi.string().required()});
const data_schema = joi.object({ f_name: joi.string().required(), s_name: joi.string(), f_lastname: joi.string().required(), s_lastname: joi.string() });

export { user_schema, data_schema };