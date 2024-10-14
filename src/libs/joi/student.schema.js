import joi from "joi";
export const studen_schema = joi.object({
    first_name: joi.string().required(),
    middle_name: joi.string(),
    last_name: joi.string().required(),
    second_last_name: joi.string(),
    email: joi.string().email().required(),
    registration_code: joi.string().required(),
    role_id: joi.number().required(),
    controller_id: joi.number().required(),
    recruiter_id: joi.number().required(),
    country_id: joi.number().required(),
    school_id: joi.number().required()
})