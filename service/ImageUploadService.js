const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const uuid = require('uuid/v4');

class ImageUploadService {

    constructor() {
        this.localDirectory = path.join(__dirname, '../static/images');
    }

    uploadImage(fileBuffer) {
        return new Promise((resolve, reject) => {
            const id = uuid();
            const filePath = this.getImagePath(id);

            this.checkDirectoryExists();

            fs.open(filePath, 'w', (error, fd) => {
                if (error) {
                    reject({
                        uploaded: 0,
                        error: {
                            message: 'Unable save the image.',
                        }
                    });
                }

                fs.write(fd, fileBuffer, 0, fileBuffer.length, null, (error) => {
                    if (error) {
                        reject({
                            uploaded: 0,
                            error: {
                                message: 'Unable save the image.',
                            }
                        });
                    }

                    fs.close(fd, () => {
                        console.log(`Uploaded image with id=${id}`);

                        resolve({
                            url: `/static/images/${id}`,
                        });
                    });
                });
            });
        });
    }

    getImagePath(id) {
        return `${this.localDirectory}/${id}`;
    }

    checkDirectoryExists() {
        mkdirp.sync(this.localDirectory);
    }
}

module.exports = new ImageUploadService();