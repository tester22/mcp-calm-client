import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import type {
  ICreateTestActivityParams,
  ICreateTestCaseActivityParams,
  ITestActivity,
  IUpdateTestActivityParams,
} from './types';

export async function listTestActivities(
  connection: ICalmConnection,
  query?: ODataQuery,
): Promise<IODataCollection<ITestActivity>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ITestActivity>
  >({
    service: 'testManagement',
    url: `/Activities${qs}`,
    method: 'GET',
  });
  return response.data;
}

export async function getTestActivity(
  connection: ICalmConnection,
  uuid: string,
): Promise<ITestActivity> {
  const response = await connection.makeRequest<ITestActivity>({
    service: 'testManagement',
    url: `/Activities/${encodeURIComponent(uuid)}`,
    method: 'GET',
  });
  return response.data;
}

export async function createTestActivity(
  connection: ICalmConnection,
  params: ICreateTestActivityParams,
): Promise<ITestActivity> {
  const response = await connection.makeRequest<ITestActivity>({
    service: 'testManagement',
    url: '/Activities',
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export async function updateTestActivity(
  connection: ICalmConnection,
  uuid: string,
  params: IUpdateTestActivityParams,
): Promise<ITestActivity> {
  const response = await connection.makeRequest<ITestActivity>({
    service: 'testManagement',
    url: `/Activities/${encodeURIComponent(uuid)}`,
    method: 'PATCH',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

export async function deleteTestActivity(
  connection: ICalmConnection,
  uuid: string,
): Promise<void> {
  await connection.makeRequest({
    service: 'testManagement',
    url: `/Activities/${encodeURIComponent(uuid)}`,
    method: 'DELETE',
  });
}

/**
 * List the activities of one test case
 * (`GET /ManualTestCases/{uuid}/toActivities`).
 */
export async function listTestCaseActivities(
  connection: ICalmConnection,
  testCaseUuid: string,
  query?: ODataQuery,
): Promise<IODataCollection<ITestActivity>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ITestActivity>
  >({
    service: 'testManagement',
    url: `/ManualTestCases/${encodeURIComponent(testCaseUuid)}/toActivities${qs}`,
    method: 'GET',
  });
  return response.data;
}

/**
 * Create an activity nested under a test case
 * (`POST /ManualTestCases/{uuid}/toActivities`).
 */
export async function createTestCaseActivity(
  connection: ICalmConnection,
  testCaseUuid: string,
  params: ICreateTestCaseActivityParams,
): Promise<ITestActivity> {
  const response = await connection.makeRequest<ITestActivity>({
    service: 'testManagement',
    url: `/ManualTestCases/${encodeURIComponent(testCaseUuid)}/toActivities`,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
