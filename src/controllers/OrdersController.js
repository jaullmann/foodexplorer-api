const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class OrdersController {

  async create(request, response) {
    const { payment_method, ordered_dishes } = request.body;
    const { user_id } = request.params;

    const [ order_id ] = await knex("orders").insert({
      user_id,
      payment_method
    })

    const orderDishesInsert = ordered_dishes.map(orderedDish => {
      return {
        order_id,
        dish_id: orderedDish.dish_id,
        dish_amount: orderedDish.dish_amount,
        dish_price_paid: orderedDish.dish_price_paid
      }
    })

    await knex("orders_details").insert(orderDishesInsert);

    return response.status(201).json();
  }

}

module.exports = OrdersController