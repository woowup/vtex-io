import type { PixelMessage, Product } from "../typings/events";

export async function sendWebTrackingEvents(e: PixelMessage) {
  const { product } = e.data;
  const price = getPrice(product);
  const listPrice = getListPrice(product);
  const productId = product.productId.toString();

  const trackingMetadata = {
    sku: product.selectedSku?.referenceId
      ? product.selectedSku.referenceId[0].Value
      : productId,
    parentId: productId,
    price,
    offer_price: null,
  };

  if (listPrice) {
    trackingMetadata.price =
      product.selectedSku.sellers[0].commertialOffer.ListPrice;
    trackingMetadata.offer_price =
      product.selectedSku?.sellers[0]?.commertialOffer?.Price;
  }

  if (trackingMetadata.offer_price === trackingMetadata.price) {
    trackingMetadata.offer_price = null;
  }

  window.trackProductViewEvent(trackingMetadata);
}

function getPrice(productData: Product) {
  return productData?.items[0]?.sellers[0]?.commertialOffer?.Price;
}

function getListPrice(productData: Product) {
  return productData?.items[0]?.sellers[0]?.commertialOffer?.ListPrice;
}
