const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishPictureController {
    async update(request, response) {            
        const { role } = request.user;
        const { dish_id } = request.params;
        const pictureFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const dish = await knex("dishes")
            .where("dish_id", dish_id)
            .first();

        if (role !== 'admin') {
            throw new AppError("Unauthorized", 401);
        }

        if (dish.image_file) {
            await diskStorage.deleteFile(dish.image_file);
        }

        const filename = await diskStorage.saveFile(pictureFilename);
        dish.image_file = filename

        await knex("dishes")
            .update(dish)
            .where("dish_id", dish_id);

        return response.status(201).json(dish);
    }
}

module.exports = DishPictureController;