const multer = require("multer");

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const upload = multer({
    dest: "/public/images/uploads"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

function routeRevImages(app, path, fs) {
    app.post(
        "/review/upload/:hash",
        upload.single("file" /* name attribute of <file> element in your form */),
        (req, res) => {
            const tempPath = req.file.path;
            var hashPath = req.params.hash;
            const targetPath = path.join(__dirname, "../public/images/uploads/" + hashPath + ".png");

            if (path.extname(req.file.originalname).toLowerCase() === ".png") {
                fs.rename(tempPath, targetPath, err => {
                    if (err) 
                        throw err;

                    res
                        .status(200)
                        .contentType("text/plain")
                        .end("File " + targetPath + " uploaded! You may close this window.");
                });
            } else {
                fs.unlink(tempPath, err => {
                    if (err) return handleError(err, res);

                    res
                        .status(403)
                        .contentType("text/plain")
                        .end("Only .png files are allowed!");
                });
            }
        }
    );
}
module.exports = {routeRevImages};