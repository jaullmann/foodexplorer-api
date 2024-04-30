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

  async show(request, response) {
    const { order_id } = request.params;
    const order = await knex("orders").where("order_id", order_id).first();    
    const orderDetails = await knex("orders_details as od")
      .select(
          "od.dish_id", 
          "ds.title", "od.dish_amount", "od.dish_price_paid")     
      .innerJoin("dishes as ds", "od.dish_id", "ds.dish_id") 
      .where("od.order_id", order_id)
      .orderBy("ds.title")

    return response.status(201).json({
      ...order,
      "order_details": orderDetails
    })
  }

  async index(request, response) {
    const { user_id, payment_method, status } = request.query;

    if (user_id | payment_method | status) {
      const orders = await knex("orders")
        .where(
            builder => {
              builder.orWhere("user_id", `${user_id}`)
              .orWhere("payment_method", `${payment_method}`)
              .orWhere("status", `${status}`)
            }
          )
        .orderBy('ordered_at');
    } else {
      const orders = await knex("orders").orderBy('ordered_at');
    }    
      
    return response.status(201).json(orders);
  }

  async update(request, response) {
    const { payment_method, ordered_dishes } = request.body;
    const { order_id } = request.params;

    await knex("orders")
      .where("order_id", order_id)
      .update({
        payment_method,
        updated_at: knex.fn.now()
      });

    if (ordered_dishes) {
      await knex("orders_details").where("order_id", order_id).delete();

      const orderDetailsInsert = ordered_dishes.map(orderDetail => {
        return {
          order_id: order_id,
          dish_id: orderDetail.dish_id,
          dish_amount: orderDetail.dish_amount,
          dish_price_paid: orderDetail.dish_price_paid
        }
      });

      await knex("orders_details").insert(orderDetailsInsert);
    }
     
    return response.status(201).json();
  }

  async delete(request, response) {    
    const { order_id } = request.params;
    await knex("orders").where("order_id", order_id).delete();

    return response.status(201).json();
  }

}

module.exports = OrdersController