import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class CoreClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdclientAutCookie:
          context.adminUserAuthToken ?? context.authToken ?? '',
      },
    })
  }

  public getSalesChannelsAsync = () =>
    this.http
      .get<any>('api/catalog_system/pvt/saleschannel/list', {
        params: {
          an: this.context.account,
        },
      })
      .then((salesChannels) => {
        return salesChannels.filter((sc: any) => sc.IsActive)
      })
}