const { Router, response } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const DishPictureController = require("../controllers/DishPictureController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishPictureController = new DishPictureController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:dish_id", dishesController.show);
dishesRoutes.put("/:dish_id", dishesController.update);
dishesRoutes.delete("/:dish_id", dishesController.delete);
dishesRoutes.patch("/image", upload.single("image"), dishPictureController.update);

module.exports = dishesRoutes;