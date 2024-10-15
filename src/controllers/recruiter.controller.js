import { allRecruiters, getRecruiterById } from "../models/recruiter.model.js";

export async function all(req, res, next) {
    try {
        const recruiters = await allRecruiters();
        res.status(200).json(recruiters);
    } catch (error) {
        next(error);
    }
}

export async function show(req, res, next) {
    try {
        const { id } = req.params;
        const recruiter = await getRecruiterById(id);
        res.status(200).json(recruiter);
    } catch (error) {
        next(error);
    }
}