import type { ICalmConnection } from '@mcp-abap-adt/interfaces';

/**
 * Delete a project by its id (`DELETE /projects/{id}`). Older tenants that
 * only expose read/create on projects may reject this with HTTP 405.
 */
export async function deleteProject(
  connection: ICalmConnection,
  id: string,
): Promise<void> {
  await connection.makeRequest({
    service: 'projects',
    url: `/projects/${encodeURIComponent(id)}`,
    method: 'DELETE',
  });
}
