import axios from 'axios';

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
    vt_identifier: "email",
  };
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": config.woowupVtexKey,
  }

  return await axios.post("https://admin.woowup.com/apiv3/vtex/integration", body, { headers })
    .then((r: any) => {
      return { status: r.status, body }})
    .then((response: any) => {
      return response.status;
    })
    .catch(_e => {
      return 500;
    })
}
