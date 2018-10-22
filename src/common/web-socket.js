/**
 * 用于导出公用的 websocket 对象
 */
import { Ip } from "../api/_fetch";
let webSocket = null;
export default class getWebSocketInstance {
  static getInstance() {
    console.log("getWebSocketInstance", this.webSocket);
    if (webSocket === null) {
      webSocket = new WebSocket(`ws://${Ip["Test"]}/push/recv`);
    }
    return webSocket;
  }
}
