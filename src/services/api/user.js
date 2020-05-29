import http from "../http";
// 函数生产
const userFuns = {
  getOrderList: "/api/getOrderList"
};
//生成函数实例
export default Object.assign(
  http.packageNewFuns({funs:userFuns},http.post,"user"),
);
