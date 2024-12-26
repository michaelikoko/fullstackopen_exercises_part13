const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'SequelizeValidationError':
            const errors = err.errors.map((error) => error.message);
            return res.status(400).json({ errors: errors });
            break;
        case 'SequelizeDatabaseError':
            return res.status(400).json({ error: err.message });
            break;
        default:
            console.error(err);
            return res.status(500).json({ error: err.message });
            break;
    }

};
module.exports = errorHandler;
