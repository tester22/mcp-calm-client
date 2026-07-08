import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import type { ICreateTestApplicationParams, ITestApplication } from './types';

/**
 * List the applications linked to one activity
 * (`GET /Activities/{uuid}/toApplications`).
 */
export async function listActivityApplications(
  connection: ICalmConnection,
  activityUuid: string,
  query?: ODataQuery,
): Promise<IODataCollection<ITestApplication>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ITestApplication>
  >({
    service: 'testManagement',
    url: `/Activities/${encodeURIComponent(activityUuid)}/toApplications${qs}`,
    method: 'GET',
  });
  return response.data;
}

/**
 * Link an application to one activity
 * (`POST /Activities/{uuid}/toApplications`).
 */
export async function createActivityApplication(
  connection: ICalmConnection,
  activityUuid: string,
  params: ICreateTestApplicationParams,
): Promise<ITestApplication> {
  const response = await connection.makeRequest<ITestApplication>({
    service: 'testManagement',
    url: `/Activities/${encodeURIComponent(activityUuid)}/toApplications`,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
