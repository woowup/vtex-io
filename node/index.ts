import {
  ClientsConfig,
  Service,
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
});
