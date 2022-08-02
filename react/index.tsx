import { canUseDOM } from "vtex.render-runtime";

import { sendWebTrackingEvents } from "./modules/webtrackingEvents";
import type { PixelMessage } from "./typings/events";

// no-op for extension point
// eslint-disable-next-line react/display-name, func-names
export default function () {
  return null;
}

export function handleEvents(e: PixelMessage) {
  // eslint-disable-next-line no-console
  console.log("HOLA");
  if (e.data.eventName === "vtex:productImpression") {
    // eslint-disable-next-line no-console
    console.log("EVENTO: ", e);
    sendWebTrackingEvents(e);
  }
}

if (canUseDOM) {
  window.addEventListener("message", handleEvents);
}
