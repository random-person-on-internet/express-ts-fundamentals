import { orders } from "../data/orders";
import { bakingStatus } from "../data/bakingStatus";
import { Body, Get, JsonController, Param, Post } from "routing-controllers";

@JsonController("/baking")
export class BakingController {
  @Post("/start")
  startBaking(@Body() body: { id: string }) {
    const order = orders.find((o) => o.id === body.id);
    if (!order) {
      return { status: "error", error: "Order not found" };
    }

    bakingStatus[body.id] = "Baking started";
    return {
      status: "success",
      message: `Baking started for order ${body.id}`,
    };
  }

  @Get("/status/:id")
  getStatus(@Param("id") id: string) {
    const status = bakingStatus[id];
    if (!status) {
      return {
        status: "error",
        error: "No baking status found for this order",
      };
    }

    return { status: "success", orderId: id, bakingStatus: status };
  }
}
