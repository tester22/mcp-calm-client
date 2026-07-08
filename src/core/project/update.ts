import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IProject, IUpdateProjectParams } from './types';

/**
 * Update a project by its id (`PATCH /projects/{id}`). The Cloud ALM Projects
 * API gained fetch/update support in 2025; older tenants may reject this with
 * HTTP 405.
 */
export async function updateProject(
  connection: ICalmConnection,
  id: string,
  params: IUpdateProjectParams,
): Promise<IProject> {
  const response = await connection.makeRequest<IProject>({
    service: 'projects',
    url: `/projects/${encodeURIComponent(id)}`,
    method: 'PATCH',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
