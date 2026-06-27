import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from './service';
import type { ICreateDevelopmentParams, IDevelopment } from './types';

export async function createDevelopment(
  connection: ICalmConnection,
  params: ICreateDevelopmentParams,
): Promise<IDevelopment> {
  const response = await connection.makeRequest<IDevelopment>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: '/Developments',
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
