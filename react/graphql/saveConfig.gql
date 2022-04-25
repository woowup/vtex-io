export default function saveConfig(
    _: any,
    { config }: { config: string },
    ctx: Context
) {
    return ctx.clients.vbase
        .saveJSON('account.example', 'configs', { config })
        .then((_) => 'success')
}