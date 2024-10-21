import fs from 'fs';
import { CLIENT_EMAIL, PRIVATE_KEY } from '../config/app.config.js';
import { google } from 'googleapis';


const SCOPE = ['https://www.googleapis.com/auth/drive'];
async function authorize() {
    const jwtClient = new google.auth.JWT(
        CLIENT_EMAIL,
        null,
        PRIVATE_KEY,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}

async function uploadFile(mimeType, fileName, filePath) {
    const auth = await authorize();
    return new Promise((resolve, reject) => {
        const drive = google.drive({ version: 'v3', auth });

        const fileMetadata = {
            name: fileName,
            parents: ['1A4pgn3RfoG1sJtrZFG83FP1jXtDV6O5y'],
        };

        drive.files.create({
            resource: fileMetadata,
            media: {
                mimeType: mimeType,
                body: fs.createReadStream(filePath),
            },
            fields: 'id',
        }, (err, file) => {
            if (err) {
                return reject(err);
            }
            resolve(file.data.id);
        });

    });
}


async function downloadFile(fileId) {
    const auth = await authorize();
    const service = google.drive({ version: 'v3', auth });

    try {
        const result = await service.files.get({
            fileId: fileId,
            alt: 'media',
        });
        return result;
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
}

async function deleteFile(fileId) {
    const auth = await authorize();
    const service = google.drive({ version: 'v3', auth });

    try {
        const result = await service.files.delete({
            fileId: fileId,
        })
        return result;
    } catch (err) {
        throw err;
    }
}

export { uploadFile, downloadFile, deleteFile };