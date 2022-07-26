const DEFAULT_IDENTIFIER = 'email';
const HTTP_OK_MESSAGE = 'ok';
const HTTP_OK = 200;
const HTTP_ERROR = 500;

export default async function sendToWoowup(_: any, { config }: any, ctx: Context) {
  const body = {
    vt_store: config.url,
    vt_name: ctx.clients.core.getAccountName(),
    vt_appkey: config.appKey,
    vt_apptoken: config.appToken,
    vt_seller: config.seller,
    vt_categories_enabled: config.downloadCategories,
    vt_status: config.orderStatus,
    vt_f_saleschannel: config.salesChannel,
    vt_identifier: DEFAULT_IDENTIFIER,
  };

  return await ctx.clients.woowup.updateConfiguration(body, config.woowupVtexKey)
    .then((r: any) => {
      return { status: r.code, body }})
    .then((response: any) => {
      if (response.status === HTTP_OK_MESSAGE) {
        return HTTP_OK;
      }
      return HTTP_ERROR;
    })
    .catch(_e => {
      return HTTP_ERROR;
    })
}
