import {
  ClientsConfig,
  Service,
  method,
  ServiceContext,
} from "@vtex/api";

import { Clients } from "./clients";
import { queries, mutations } from "./resolvers";

const TIMEOUT_MS = 2000;

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
};

declare global {
  type Context = ServiceContext<Clients>;
}

async function worker(ctx: ServiceContext, next: () => Promise<unknown>) {
  ctx.status = 200
  ctx.set('content-type', 'application/javascript; charset=utf-8')
  ctx.set('cache-control', 'public, max-age=7200')
  ctx.body = `importScripts('https://js.pusher.com/beams/service-worker.js');`
  await next()
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query: {
        ...queries,
      },
      Mutation: {
        ...mutations,
      },
    },
  },
  routes: {
    "service-worker": method({
      GET: [worker],
    })
  },

});
