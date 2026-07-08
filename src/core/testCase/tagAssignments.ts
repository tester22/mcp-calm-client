import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import type { ITestTagAssignment } from './types';

/** List all tag assignments across the tenant (`GET /TagAssignments`). */
export async function listTestTagAssignments(
  connection: ICalmConnection,
  query?: ODataQuery,
): Promise<IODataCollection<ITestTagAssignment>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ITestTagAssignment>
  >({
    service: 'testManagement',
    url: `/TagAssignments${qs}`,
    method: 'GET',
  });
  return response.data;
}

/**
 * List the tag assignments of one test case
 * (`GET /ManualTestCases/{uuid}/toTagAssignments`).
 */
export async function listTestCaseTagAssignments(
  connection: ICalmConnection,
  testCaseUuid: string,
  query?: ODataQuery,
): Promise<IODataCollection<ITestTagAssignment>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ITestTagAssignment>
  >({
    service: 'testManagement',
    url: `/ManualTestCases/${encodeURIComponent(testCaseUuid)}/toTagAssignments${qs}`,
    method: 'GET',
  });
  return response.data;
}
