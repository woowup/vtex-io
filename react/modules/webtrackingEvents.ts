import type { PixelMessage, Product } from "../typings/events";

export async function sendWebTrackingEvents(e: PixelMessage) {
  const { product } = e.data;
  const price = getPrice(product);
  const listPrice = getListPrice(product);

  const trackingMetadata = {
    sku: product.selectedSku.referenceId[0]?.Value,
    parentId: product.productId,
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

  // eslint-disable-next-line no-console
  console.log("raw data", product);
  // eslint-disable-next-line no-console
  console.log("md", trackingMetadata);
}

function getPrice(productData: Product) {
  return productData?.items[0]?.sellers[0]?.commertialOffer?.Price;
}

function getListPrice(productData: Product) {
  return productData?.items[0]?.sellers[0]?.commertialOffer?.ListPrice;
}
