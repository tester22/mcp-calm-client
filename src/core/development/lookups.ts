import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from './service';
import type { IDevelopmentSource, IDevelopmentType } from './types';

/** List all defined development sources (`/DevelopmentSources`). */
export async function listDevelopmentSources(
  connection: ICalmConnection,
  query?: ODataQuery,
): Promise<IODataCollection<IDevelopmentSource>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<IDevelopmentSource>
  >({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/DevelopmentSources${qs}`,
    method: 'GET',
  });
  return response.data;
}

/** List all possible development types (`/DevelopmentTypes`). */
export async function listDevelopmentTypes(
  connection: ICalmConnection,
  query?: ODataQuery,
): Promise<IODataCollection<IDevelopmentType>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<IDevelopmentType>
  >({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/DevelopmentTypes${qs}`,
    method: 'GET',
  });
  return response.data;
}

/**
 * Retrieve the source of one development
 * (`/Developments/{uuid}/toSource`).
 */
export async function getDevelopmentSource(
  connection: ICalmConnection,
  developmentUuid: string,
): Promise<IDevelopmentSource> {
  const response = await connection.makeRequest<IDevelopmentSource>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(developmentUuid)}/toSource`,
    method: 'GET',
  });
  return response.data;
}

/**
 * Retrieve the development type of one development
 * (`/Developments/{uuid}/toDevelopmentType`).
 */
export async function getDevelopmentType(
  connection: ICalmConnection,
  developmentUuid: string,
): Promise<IDevelopmentType> {
  const response = await connection.makeRequest<IDevelopmentType>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(developmentUuid)}/toDevelopmentType`,
    method: 'GET',
  });
  return response.data;
}
