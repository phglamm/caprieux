import { request } from "./request";

const orderService = {
  getOrders: () => request("GET", "/api/orders"),
};

export default orderService;
