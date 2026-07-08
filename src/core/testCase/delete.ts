import type { ICalmConnection } from '@mcp-abap-adt/interfaces';

export async function deleteTestCase(
  connection: ICalmConnection,
  uuid: string,
): Promise<void> {
  await connection.makeRequest({
    service: 'testManagement',
    url: `/ManualTestCases/${encodeURIComponent(uuid)}`,
    method: 'DELETE',
  });
}

/**
 * Force-delete a test case, including its test runs and results
 * (`POST /ManualTestCases/{uuid}/api.v1.ExternalServiceAPI.forceDeletionIncludingTestRunsAndResults`).
 *
 * Unlike the standard delete, this succeeds even when the test case already
 * has execution data. The deletion is permanent and cannot be undone.
 */
export async function forceDeleteTestCase(
  connection: ICalmConnection,
  uuid: string,
): Promise<void> {
  await connection.makeRequest({
    service: 'testManagement',
    url: `/ManualTestCases/${encodeURIComponent(uuid)}/api.v1.ExternalServiceAPI.forceDeletionIncludingTestRunsAndResults`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}
