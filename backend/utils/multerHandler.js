  import multer from "multer";

  const Servicestorage = multer.diskStorage({
    destination: "uploads/service",

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  const Customerstorage = multer.diskStorage({
    destination: "uploads/customers",

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  const GalleryStorage = multer.diskStorage({
    destination: "uploads/customers",

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  export const uploadService = multer({ storage:Servicestorage });
  export const uploadCustomer = multer({ storage:Customerstorage});
  export const uploadGallery = multer({ storage:GalleryStorage });