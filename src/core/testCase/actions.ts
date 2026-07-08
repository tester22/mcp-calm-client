import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import type {
  ICreateActivityActionParams,
  ICreateTestActionParams,
  ITestAction,
  IUpdateTestActionParams,
} from './types';

export async function listTestActions(
  connection: ICalmConnection,
  query?: ODataQuery,
): Promise<IODataCollection<ITestAction>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<IODataCollection<ITestAction>>({
    service: 'testManagement',
    url: `/Actions${qs}`,
    method: 'GET',
  });
  return response.data;
}

export async function getTestAction(
  connection: ICalmConnection,
  uuid: string,
): Promise<ITestAction> {
  const response = await connection.makeRequest<ITestAction>({
    service: 'testManagement',
    url: `/Actions/${encodeURIComponent(uuid)}`,
    method: 'GET',
  });
  return response.data;
}

export async function createTestAction(
  connection: ICalmConnection,
  params: ICreateTestActionParams,
): Promise<ITestAction> {
  const response = await connection.makeRequest<ITestAction>({
    service: 'testManagement',
    url: '/Actions',
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export async function updateTestAction(
  connection: ICalmConnection,
  uuid: string,
  params: IUpdateTestActionParams,
): Promise<ITestAction> {
  const response = await connection.makeRequest<ITestAction>({
    service: 'testManagement',
    url: `/Actions/${encodeURIComponent(uuid)}`,
    method: 'PATCH',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export async function deleteTestAction(
  connection: ICalmConnection,
  uuid: string,
): Promise<void> {
  await connection.makeRequest({
    service: 'testManagement',
    url: `/Actions/${encodeURIComponent(uuid)}`,
    method: 'DELETE',
  });
}

/**
 * Create an action nested under an activity
 * (`POST /Activities/{uuid}/toActions`).
 */
export async function createActivityAction(
  connection: ICalmConnection,
  activityUuid: string,
  params: ICreateActivityActionParams,
): Promise<ITestAction> {
  const response = await connection.makeRequest<ITestAction>({
    service: 'testManagement',
    url: `/Activities/${encodeURIComponent(activityUuid)}/toActions`,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
