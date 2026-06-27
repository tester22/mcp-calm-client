import type { CalmService } from '@mcp-abap-adt/interfaces';

/**
 * Service identifier for the Cross-Library Developments OData API
 * (`/calm-crosslibrarydevelopments/v1`).
 *
 * NOTE: `@mcp-abap-adt/interfaces` does not yet list this service in its
 * `CALM_SERVICES` union (latest published: 8.0.0 — `features`, `documents`,
 * `tasks`, `projects`, `testManagement`, `hierarchy`, `analytics`,
 * `processMonitoring`, `logs`). Until the contract is extended, the literal
 * is cast to `CalmService` so this client can route requests through the
 * shared `ICalmConnection`. The concrete connection implementation
 * (`@mcp-abap-adt/calm-server`) must map this id to the service base URL
 * `/calm-crosslibrarydevelopments/v1`; the bundled test connection already
 * does (see `src/__tests__/helpers/test-connection.ts`).
 */
export const CROSS_LIBRARY_DEVELOPMENTS_SERVICE =
  'crossLibraryDevelopments' as CalmService;

/** Cloud ALM base path for the Cross-Library Developments service. */
export const CROSS_LIBRARY_DEVELOPMENTS_ROUTE =
  '/calm-crosslibrarydevelopments/v1';
