import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({
    storage,
    })


//cb = callback

// original name is not suggested because uploader may hhave multiple 
// file of same name which will override in future 