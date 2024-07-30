const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const DishPictureController = require("../controllers/DishPictureController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishPictureController = new DishPictureController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:dish_id", dishesController.show);
dishesRoutes.post("/", verifyUserAuthorization("admin"), dishesController.create);
dishesRoutes.put("/:dish_id", verifyUserAuthorization("admin"), dishesController.update);
dishesRoutes.delete("/:dish_id", verifyUserAuthorization("admin"), dishesController.delete);
dishesRoutes.patch("/image/:dish_id", upload.single("image"), verifyUserAuthorization("admin"), dishPictureController.update);

module.exports = dishesRoutes;