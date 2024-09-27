export default (body, rules) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const options = {
        "type": (field, rule) => typeof body[field] !== rules[field][rule] && errors.push(`${field} is not a ${rules[field][rule]}`),
        "required": (field) => !body[field] && errors.push(`${field} is required`),
        "email": (field) => !emailRegex.test(body[field]) && errors.push(`${field} is not a valid email`),
        "min": (field, rule) => body[field].length < rules[field][rule] && errors.push(`${field} is less than ${rules[field][rule]} characters`),
        "max": (field, rule) => body[field].length > rules[field][rule] && errors.push(`${field} is more than ${rules[field][rule]} characters`),
    }
    for (const field in rules) {

        for (const rule in rules[field]) {

            options[rule](field, rule);
        }
        if (errors.length > 0) {
            throw { message: errors.join(", "), status: 400 };
        }
    }
}