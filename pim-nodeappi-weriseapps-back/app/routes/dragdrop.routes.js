module.exports = app => {
    const multer = require('multer');
    var upload = multer({ dest: '../projects/' })

    var storage = multer.diskStorage({

        destination: function (req, file, cb) {
            multer({ dest: '../projects/' + req.body.project + '/' })

            multer({ dest: '../projects/' + req.body.project + '/' })
            multer({ dest: '../projects/' + req.body.project + '/js/controllers' })
            multer({ dest: '../projects/' + req.body.project + '/js/models' })
            multer({ dest: '../projects/' + req.body.project + '/js/routes' })

            if (req.body.type == "sql") {
                cb(null, '../projects/' + req.body.project + '/')
            } else if (req.body.type == "json") {
                if (req.body.name == "package") {
                    cb(null, '../projects/' + req.body.project + '/js')
                } else if (req.body.name == "swagger") {
                    cb(null, '../projects/' + req.body.project + '/js')

                }
                else {
                    cb(null, '../projects/' + req.body.project + '/')
                }
            } else if (req.body.type == "js") {
                if (req.body.name.endsWith("Controller")) {
                    cb(null, '../projects/' + req.body.project + '/js/controllers')
                } else if (req.body.name.endsWith("Schema")) {
                    cb(null, '../projects/' + req.body.project + '/js/models')
                } else if (req.body.name.endsWith("Routes")) {
                    cb(null, '../projects/' + req.body.project + '/js/routes')
                }
                else {
                    cb(null, '../projects/' + req.body.project + '/js/')
                }

            } else if (req.body.type == "dockerfile") {
                cb(null, '../projects/' + req.body.project + '/js/')

            }
        },
        filename: function (req, file, cb) {
            cb(null, req.body.name + "." + req.body.type)
        }
    })
    /*
    const fileFilter = (req, file, cb) => {
      if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'text/plain') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
    */
    var upload = multer({ storage: storage })
    app.post('/upload', upload.single("file"), function (req, res, next) {

        return res.json({
            success: 1,
            body: req.body,
            test: req.fileValidationError,
            message: "File Uploaded successfuly"
        });
    });

};