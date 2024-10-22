
export default (req, res, next) => {
    const { auth: { role } } = req
    if (parseInt(role.id) !== 1) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    next();
};