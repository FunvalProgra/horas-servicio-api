import { allControllers, getControllerById} from "../models/controller.model.js";

export async function all(req, res, next) {
    try {
        const controllers = await allControllers();
        res.status(200).json(controllers);
    } catch (error) {
        next(error);
    }
}

export async function show(req, res, next) {
    try {
        const { id } = req.params;
        const controller = await getControllerById(id);
        res.status(200).json(controller);
    } catch (error) {
        next(error);
    }
}