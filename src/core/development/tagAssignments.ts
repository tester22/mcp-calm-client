import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from './service';
import type { ITagAssignment } from './types';

/** List all tag assignments across the tenant (`/TagAssignments`). */
export async function listTagAssignments(
  connection: ICalmConnection,
  query?: ODataQuery,
): Promise<IODataCollection<ITagAssignment>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ITagAssignment>
  >({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/TagAssignments${qs}`,
    method: 'GET',
  });
  return response.data;
}

/**
 * List the tag assignments of one development
 * (`/Developments/{uuid}/toTagAssignments`).
 */
export async function listDevelopmentTagAssignments(
  connection: ICalmConnection,
  developmentUuid: string,
  query?: ODataQuery,
): Promise<IODataCollection<ITagAssignment>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ITagAssignment>
  >({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(developmentUuid)}/toTagAssignments${qs}`,
    method: 'GET',
  });
  return response.data;
}
