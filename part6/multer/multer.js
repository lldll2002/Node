import multer from 'multer';


try {
  fstat.raddirSync
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, './uploads');
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSieze: 5 * 1024 * 1024},
})