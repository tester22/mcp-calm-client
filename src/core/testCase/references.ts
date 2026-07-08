import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import type { ICreateTestReferenceParams, ITestReference } from './types';

/**
 * List the references of one test case
 * (`GET /ManualTestCases/{uuid}/toReferences`).
 */
export async function listTestCaseReferences(
  connection: ICalmConnection,
  testCaseUuid: string,
  query?: ODataQuery,
): Promise<IODataCollection<ITestReference>> {
  const qs = query ? query.toQueryString() : '';
  const response = await connection.makeRequest<
    IODataCollection<ITestReference>
  >({
    service: 'testManagement',
    url: `/ManualTestCases/${encodeURIComponent(testCaseUuid)}/toReferences${qs}`,
    method: 'GET',
  });
  return response.data;
}

/**
 * Create a reference nested under a test case
 * (`POST /ManualTestCases/{uuid}/toReferences`).
 */
export async function createTestCaseReference(
  connection: ICalmConnection,
  testCaseUuid: string,
  params: ICreateTestReferenceParams,
): Promise<ITestReference> {
  const response = await connection.makeRequest<ITestReference>({
    service: 'testManagement',
    url: `/ManualTestCases/${encodeURIComponent(testCaseUuid)}/toReferences`,
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
