import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import { CalmApiError } from '../../errors/CalmApiError';
import { ODataQuery } from '../../odata/ODataQuery';
import { listDevelopments } from './list';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from './service';
import type { IDevelopment } from './types';

export async function getDevelopment(
  connection: ICalmConnection,
  uuid: string,
): Promise<IDevelopment> {
  const response = await connection.makeRequest<IDevelopment>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(uuid)}`,
    method: 'GET',
  });
  return response.data;
}

export async function getDevelopmentByDisplayId(
  connection: ICalmConnection,
  displayId: string,
): Promise<IDevelopment> {
  const escaped = displayId.replace(/'/g, "''");
  const collection = await listDevelopments(
    connection,
    ODataQuery.new().filter(`displayId eq '${escaped}'`).top(1),
  );
  const first = collection.value?.[0];
  if (!first) {
    throw CalmApiError.fromNotFound('Development (displayId)', displayId);
  }
  return first;
}

export async function getDevelopmentWithExpand<T = unknown>(
  connection: ICalmConnection,
  uuid: string,
  expand: string[],
): Promise<T> {
  const qs = expand.length === 0 ? '' : `?$expand=${expand.join(',')}`;
  const response = await connection.makeRequest<T>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(uuid)}${qs}`,
    method: 'GET',
  });
  return response.data;
}

/**
 * Retrieve the development that owns a given external reference
 * (`/ExternalReferences/{uuid}/toDevelopment`).
 */
export async function getDevelopmentByExternalReference(
  connection: ICalmConnection,
  externalReferenceUuid: string,
): Promise<IDevelopment> {
  const response = await connection.makeRequest<IDevelopment>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/ExternalReferences/${encodeURIComponent(externalReferenceUuid)}/toDevelopment`,
    method: 'GET',
  });
  return response.data;
}
