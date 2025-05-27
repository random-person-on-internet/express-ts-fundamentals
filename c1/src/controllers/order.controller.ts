import { Order } from "../models/order.model";
import { orders } from "../data/orders";
import { Body, Get, JsonController, Param, Post } from "routing-controllers";

@JsonController("/orders")
export class OrderController {
  @Get("/")
  getAll() {
    return orders;
  }

  @Get("/:id")
  getOne(@Param("id") id: string) {
    const order = orders.find((o) => o.id === id);
    if (!order) {
      return { status: "error", error: "Order not found" };
    }
    return { status: "success", data: order };
  }

  @Post("/")
  create(@Body() order: Omit<Order, "id">) {
    const newOrder: Order = {
      ...order,
      id: (orders.length + 1).toString(),
    };
    orders.push(newOrder);
    return { status: "success", data: newOrder };
  }
}
