import multer from "multer";

const MIMETYPE = ['application/pdf'];
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
        const id = req.auth.id
        const uniqueSuffix = id + Date.now()
        const filename = file.fieldname + '-' + uniqueSuffix + '.pdf'
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    if (MIMETYPE.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
}

export const upload = multer({ storage, fileFilter });