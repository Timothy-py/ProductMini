import { incrementStoreProductCount } from "../controllers/storeController";
import eventEmitter from "./event";

const eventListeners = () => {
  eventEmitter.on("productAdded", async (data: { storeId: string }) => {
    await incrementStoreProductCount(data.storeId);
  });
};

export default eventListeners;
