import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from './service';
import type { IUpdateDevelopmentParams } from './types';

/**
 * Update a development by its UUID. The Cross-Library Developments API
 * responds with `204 No Content`, so no entity is returned.
 */
export async function updateDevelopment(
  connection: ICalmConnection,
  uuid: string,
  params: IUpdateDevelopmentParams,
): Promise<void> {
  await connection.makeRequest({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(uuid)}`,
    method: 'PATCH',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
}
