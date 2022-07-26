import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class WoowupClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `https://admin.woowup.com/apiv3/vtex/integration`,
      context,
      options
    )
  }

  public async updateConfiguration(body: any, vtexKey: string): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": vtexKey,
    }

    return this.http.post('', body, {
      headers
    })
  }
}