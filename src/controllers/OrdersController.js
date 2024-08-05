const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class OrdersController {

  async create(request, response) {
    const { payment_method, ordered_dishes } = request.body; 
    const { user_id } = request.user; 

    const [ order_id ] = await knex("orders").insert({
      user_id,
      payment_method,
      ordered_at: knex.fn.now(),
      updated_at: knex.fn.now()
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

    return response.status(201).json({ order_id });
  }

  async show(request, response) { 
    const { order_id } = request.params;
    const { user_id, role } = request.user;      
    
    if (!order_id) {
      return response.status(201).json()
    }

    let order = null; 
    
    if (role === "admin") {
      order = await knex("orders")              
        .where("order_id", order_id)
        .first()        
      if (!order) {
        return response.status(201).json()
      }
    } else {
      order = await knex("orders")      
        .where("user_id", user_id)      
        .andWhere("order_id", order_id)  
        .first()

      if (!order)  {
        throw new AppError("Unauthorized", 401);
      }
    } 

    const orderDetails = await knex("orders_details as od")
      .select("od.dish_id", "ds.title", "od.dish_amount", "od.dish_price_paid as dish_price", "ds.image_file")      
      .innerJoin("dishes as ds", "od.dish_id", "ds.dish_id") 
      .where("od.order_id", order_id)       
      .orderBy("ds.title")

    return response.status(201).json({
      ...order,
      "order_details": orderDetails
    })
  }

  async index(request, response) {
    const { user_id, role } = request.user; 

    let orders = null;
    let ordersDetails = null;

    if (role === "customer") {
      orders = await knex("orders")
        .where("user_id", `${user_id}`)
        .orderBy('order_id');

      ordersDetails = await knex("orders_details as od")
        .select("od.order_id", "od.dish_id", "ds.title", "od.dish_amount", "od.dish_price_paid")  
        .innerJoin("orders as or", "od.order_id", "or.order_id")
        .innerJoin("dishes as ds", "od.dish_id", "ds.dish_id")
        .where("or.user_id", user_id)
        .orderBy("od.order_id");
    } else {
      orders = await knex("orders").orderBy('order_id');
      
      ordersDetails = await knex("orders_details as od")
        .select("od.order_id", "od.dish_id", "ds.title", "od.dish_amount", "od.dish_price_paid")  
        .innerJoin("dishes as ds", "od.dish_id", "ds.dish_id")
        .orderBy("od.order_id");
    } 

    const ordersWithDetails = orders.map(order => {
      const orderDetails = ordersDetails.filter(details => details.order_id === order.order_id);
      return {
        ...order,
        details: orderDetails
      }
    })
      
    return response.status(201).json(ordersWithDetails);
  }

  async update(request, response) {
    const { payment_method, ordered_dishes } = request.body;
    const { order_id } = request.params;
    const { role } = request.user;
   
    if (role !== 'admin') {
      throw new AppError("Unauthorized", 401);
    }

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
    const { role } = request.user;

    if (role !== 'admin') {
      throw new AppError("Unauthorized", 401);
    }

    await knex("orders").where("order_id", order_id).delete();

    return response.status(201).json();
  }

}

module.exports = OrdersController