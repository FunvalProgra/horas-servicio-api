
export default (req, res, next) => {
    const { auth: { role } } = req
    console.log(role);
    if (role.id !== 1) {
        res.status(401).json({ message: "Unauthorized" })
    }
    next();
};