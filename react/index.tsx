import { canUseDOM } from "vtex.render-runtime";

import { sendWebTrackingEvents } from "./modules/webtrackingEvents";
import type { PixelMessage } from "./typings/events";

// no-op for extension point
// eslint-disable-next-line react/display-name, func-names
export default function () {
  return null;
}

export function handleEvents(e: PixelMessage) {
  if (e.data.eventName === "vtex:productView" || e.data.eventName === "vtex:productClick") {
    sendWebTrackingEvents(e);
  }
}

if (canUseDOM) {
  window.addEventListener("message", handleEvents);
}