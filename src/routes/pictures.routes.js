const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishPictureController = require("../controllers/DishPictureController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishPictureController = new DishPictureController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.patch("/:dish_id", upload.single("image"), verifyUserAuthorization("admin"), dishPictureController.update);
dishesRoutes.delete("/", verifyUserAuthorization("admin"), dishPictureController.delete);

module.exports = dishesRoutes;