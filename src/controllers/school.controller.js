import { allSchools, getSchoolById, createSchool, removeSchool, updateSchool } from "../models/school.model.js";

export async function all(req, res, next) {
    try {
        const schools = await allSchools();
        res.json(schools);
    } catch (error) {
        next(error);
    }
}

export async function get(req, res, next) {
    try {
        const school = await getSchoolById(req.params.id);
        res.json(school);
    } catch (error) {
        next(error);
    }
}

export async function create(req, res, next) {
    try {
        const result = await createSchool(req.body.name);
        res.status(201).json({message: "School created successfully"});
    } catch (error) {
        next(error);
    }
}

export async function update(req, res, next) {
    try {
        const result = await updateSchool(req.params.id, req.body.name);
        res.status(201).json({message: "School updated successfully"});
    } catch (error) {
        next(error);
    }
}

export async function remove(req, res, next) {
    try {
        const result = await removeSchool(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}
