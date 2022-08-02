import type {
  //  Order,
  PixelMessage,
  /*  ProductOrder,
  Impression,
  CartItem,
  AddToCartData,
  RemoveToCartData,
  ProductViewData,
  Seller,
  ProductClickData,
  ProductViewReferenceId, */
} from "../typings/events";

export async function sendWebTrackingEvents(e: PixelMessage) {
  const rawData = e.data;

  // eslint-disable-next-line no-console
  console.log("raw data", rawData);
}
