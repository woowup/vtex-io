export default function config(_: any, __: any, ctx: Context) {
    return ctx.clients.vbase
          .getJSON('account.example', 'configs')
          .catch((_) => null)
}