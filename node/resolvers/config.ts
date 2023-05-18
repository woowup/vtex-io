const HTTP_OK_MESSAGE = 'ok';
const HTTP_ERROR = 500;

export default async function config(_: any, __: any, ctx: Context) {
  const settings = await ctx.clients.apps.getAppSettings(process.env.VTEX_APP_ID!);
  const wupVtexKey = settings['wu-VtexKey'];

  return await ctx.clients.woowup.getConfiguration(wupVtexKey)
      .then((r: any) => {
        return { status: r.code, payload: r.payload }})
      .then((response: any) => {
        if (response.status === HTTP_OK_MESSAGE) {
          const wupConfig = response.payload.config[0];

          return {
            url: wupConfig.vt_store,
            orderStatus: wupConfig.vt_status,
            seller: wupConfig.vt_seller,
            appKey: wupConfig.vt_appkey,
            appToken: wupConfig.vt_apptoken,
            salesChannel: wupConfig.vt_f_saleschannel,
            downloadCategories: wupConfig.vt_categories_enabled ? '1' : '0',
            woowupVtexKey: wupVtexKey
          };
        }
        return HTTP_ERROR;
      })
      .catch(_e => {
        return HTTP_ERROR;
      })
}
