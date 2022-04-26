export default function saveConfig(_: any, { config }: any, ctx: Context) {
  return ctx.clients.vbase
    .saveJSON("account.example", "configs", config)
    .then((_) => "success");
}
