const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishPictureController = require("../controllers/DishPictureController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const picturesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishPictureController = new DishPictureController();

picturesRoutes.use(ensureAuthenticated);

picturesRoutes.patch("/:dish_id", upload.single("image"), verifyUserAuthorization("admin"), dishPictureController.update);
picturesRoutes.delete("/", verifyUserAuthorization("admin"), dishPictureController.delete);

module.exports = picturesRoutes;