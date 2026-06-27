import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from './service';
import type { IDevelopment } from './types';

/**
 * List cross-library developments. Unlike Features, the Developments
 * collection is tenant-wide (no `projectId` request param), so a plain
 * OData query string is sufficient.
 */
export async function listDevelopments(
  connection: ICalmConnection,
  query?: ODataQuery,
): Promise<IODataCollection<IDevelopment>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<IODataCollection<IDevelopment>>(
    {
      service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
      url: `/Developments${qs}`,
      method: 'GET',
    },
  );
  return response.data;
}
