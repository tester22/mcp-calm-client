import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from './service';
import type {
  ICreateLibraryAssignmentParams,
  ILibraryAssignment,
} from './types';

/**
 * List all library assignments (library items linked to developments) across
 * the tenant (`/LibraryAssignments`).
 */
export async function listLibraryAssignments(
  connection: ICalmConnection,
  query?: ODataQuery,
): Promise<IODataCollection<ILibraryAssignment>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ILibraryAssignment>
  >({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/LibraryAssignments${qs}`,
    method: 'GET',
  });
  return response.data;
}

/** Retrieve a single library assignment by its UUID. */
export async function getLibraryAssignment(
  connection: ICalmConnection,
  uuid: string,
): Promise<ILibraryAssignment> {
  const response = await connection.makeRequest<ILibraryAssignment>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/LibraryAssignments/${encodeURIComponent(uuid)}`,
    method: 'GET',
  });
  return response.data;
}

/** Create a library assignment (link a library item to a development). */
export async function createLibraryAssignment(
  connection: ICalmConnection,
  params: ICreateLibraryAssignmentParams,
): Promise<ILibraryAssignment> {
  const response = await connection.makeRequest<ILibraryAssignment>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: '/LibraryAssignments',
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

/** Delete a library assignment by its UUID. */
export async function deleteLibraryAssignment(
  connection: ICalmConnection,
  uuid: string,
): Promise<void> {
  await connection.makeRequest({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/LibraryAssignments/${encodeURIComponent(uuid)}`,
    method: 'DELETE',
  });
}

/**
 * List the library assignments of one development
 * (`/Developments/{uuid}/toLibraryAssignments`).
 */
export async function listDevelopmentLibraryAssignments(
  connection: ICalmConnection,
  developmentUuid: string,
  query?: ODataQuery,
): Promise<IODataCollection<ILibraryAssignment>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ILibraryAssignment>
  >({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(developmentUuid)}/toLibraryAssignments${qs}`,
    method: 'GET',
  });
  return response.data;
}

/**
 * Assign a library item to one development
 * (`POST /Developments/{uuid}/toLibraryAssignments`).
 */
export async function createDevelopmentLibraryAssignment(
  connection: ICalmConnection,
  developmentUuid: string,
  params: ICreateLibraryAssignmentParams,
): Promise<ILibraryAssignment> {
  const response = await connection.makeRequest<ILibraryAssignment>({
    service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
    url: `/Developments/${encodeURIComponent(developmentUuid)}/toLibraryAssignments`,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
