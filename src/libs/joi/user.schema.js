import joi from "joi";
export const user_schema = joi.object({
    first_name: joi.string().required(),
    middle_name: joi.string(),
    last_name: joi.string().required(),
    second_last_name: joi.string(),
    email: joi.string().email().required(),
    role_id: joi.number().required(),
})