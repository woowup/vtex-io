export default function config(_: any, __: any, ctx: Context) {
  return ctx.clients.vbase
    .getJSON("woowup", "configs")
    .catch((_) => null);
}
