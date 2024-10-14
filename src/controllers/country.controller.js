import { allCountries } from "../models/country.model.js";

export const all = async (req, res, next) => {
    // #swagger.tags = ['Countries']
    try {
        const countries = await allCountries();
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
}


export default { all };