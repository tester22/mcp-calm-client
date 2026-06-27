import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from './service';

/**
 * Delete a development by its UUID. The deletion is permanent and performed
 * in a single step (no prior mark-for-deletion).
 */
export async function deleteDevelopment(
  connection: ICalmConnection,
  uuid: string,
): Promise<void> {
  await connection.makeRequest({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(uuid)}`,
    method: 'DELETE',
  });
}
