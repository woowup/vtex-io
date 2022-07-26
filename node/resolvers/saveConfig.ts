export default function saveConfig(_: any, { config }: any, ctx: Context) {
  return ctx.clients.vbase
    .saveJSON("woowup", "configs", config)
    .then((_) => "success");
}
