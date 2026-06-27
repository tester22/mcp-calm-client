import type {
  ICalmConnection,
  ICalmRequestOptions,
  ICalmResponse,
} from '@mcp-abap-adt/interfaces';
import { CalmDevelopment } from '../../../core/development/CalmDevelopment';
import { CROSS_LIBRARY_DEVELOPMENTS_SERVICE } from '../../../core/development/service';
import { CalmApiError } from '../../../errors/CalmApiError';
import { ODataQuery } from '../../../odata/ODataQuery';

interface IRecordedRequest extends ICalmRequestOptions {}

function mockConnection(respond: (req: IRecordedRequest) => unknown): {
  connection: ICalmConnection;
  calls: IRecordedRequest[];
} {
  const calls: IRecordedRequest[] = [];
  const connection: ICalmConnection = {
    connect: async () => undefined,
    getBaseUrl: async () => 'https://x',
    getServiceUrl: async () => 'https://x/calm-crosslibrarydevelopments/v1',
    makeRequest: async <T, D>(opts: ICalmRequestOptions) => {
      calls.push(opts);
      const result = respond(opts);
      if (result instanceof Error) throw result;
      return {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: result as T,
        config: {},
      } as ICalmResponse<T, D>;
    },
  };
  return { connection, calls };
}

describe('CalmDevelopment', () => {
  test('list routes to /Developments with the cross-library service', async () => {
    const { connection, calls } = mockConnection(() => ({ value: [] }));
    const d = new CalmDevelopment(connection);
    await d.list();
    expect(calls[0]).toMatchObject({
      service: CROSS_LIBRARY_DEVELOPMENTS_SERVICE,
      method: 'GET',
      url: '/Developments',
    });
  });

  test('list appends an ODataQuery (no projectId param)', async () => {
    const { connection, calls } = mockConnection(() => ({ value: [] }));
    const d = new CalmDevelopment(connection);
    await d.list(ODataQuery.new().top(10));
    expect(calls[0].url).toBe('/Developments?$top=10');
  });

  test('get uses uuid with percent-encoding', async () => {
    const { connection, calls } = mockConnection(() => ({ uuid: 'u/1' }));
    const d = new CalmDevelopment(connection);
    await d.get('u/1');
    expect(calls[0].url).toBe('/Developments/u%2F1');
    expect(calls[0].method).toBe('GET');
  });

  test('getByDisplayId escapes single quotes in filter', async () => {
    let capturedUrl = '';
    const { connection } = mockConnection((req) => {
      capturedUrl = req.url;
      return { value: [{ uuid: 'abc', displayId: "o'malley" }] };
    });
    const d = new CalmDevelopment(connection);
    const res = await d.getByDisplayId("o'malley");
    expect(res.uuid).toBe('abc');
    expect(capturedUrl).toContain('displayId%20eq%20%27o%27%27malley%27');
  });

  test('getByDisplayId throws CalmApiError(404) when empty collection', async () => {
    const { connection } = mockConnection(() => ({ value: [] }));
    const d = new CalmDevelopment(connection);
    await expect(d.getByDisplayId('missing')).rejects.toBeInstanceOf(
      CalmApiError,
    );
    await expect(d.getByDisplayId('missing')).rejects.toMatchObject({
      status: 404,
      code: 'NOT_FOUND',
    });
  });

  test('getWithExpand appends $expand', async () => {
    const { connection, calls } = mockConnection(() => ({ uuid: 'x' }));
    const d = new CalmDevelopment(connection);
    await d.getWithExpand('x', ['toLibraryAssignments', 'toSource']);
    expect(calls[0].url).toBe(
      '/Developments/x?$expand=toLibraryAssignments,toSource',
    );
  });

  test('create issues POST with JSON content-type and body', async () => {
    let capturedBody: unknown;
    let capturedHeaders: Record<string, string> | undefined;
    const { connection, calls } = mockConnection((req) => {
      capturedBody = req.data;
      capturedHeaders = req.headers;
      return { uuid: 'new-uuid', title: 'T' };
    });
    const d = new CalmDevelopment(connection);
    const res = await d.create({ title: 'T' });
    expect(calls[0].method).toBe('POST');
    expect(calls[0].url).toBe('/Developments');
    expect(capturedBody).toEqual({ title: 'T' });
    expect(capturedHeaders?.['Content-Type']).toBe('application/json');
    expect(res.uuid).toBe('new-uuid');
  });

  test('update uses PATCH with uuid in URL and returns void', async () => {
    const { connection, calls } = mockConnection(() => undefined);
    const d = new CalmDevelopment(connection);
    const res = await d.update('u', { title: 'new' });
    expect(res).toBeUndefined();
    expect(calls[0].method).toBe('PATCH');
    expect(calls[0].url).toBe('/Developments/u');
    expect(calls[0].data).toEqual({ title: 'new' });
  });

  test('delete uses DELETE', async () => {
    const { connection, calls } = mockConnection(() => undefined);
    const d = new CalmDevelopment(connection);
    await d.delete('u');
    expect(calls[0].method).toBe('DELETE');
    expect(calls[0].url).toBe('/Developments/u');
  });

  test('library assignments: top-level list/get/create/delete', async () => {
    const { connection, calls } = mockConnection((req) => {
      if (req.method === 'GET' && req.url.includes('/LibraryAssignments/'))
        return { uuid: 'la1' };
      if (req.method === 'GET') return { value: [] };
      if (req.method === 'POST')
        return { uuid: 'la1', libraryType: 'Application' };
      return undefined;
    });
    const d = new CalmDevelopment(connection);
    await d.listLibraryAssignments();
    await d.getLibraryAssignment('la1');
    await d.createLibraryAssignment({
      parentUuid: 'dev1',
      libraryUuid: 'lib1',
      libraryType: 'Application',
    });
    await d.deleteLibraryAssignment('la1');
    expect(calls[0]).toMatchObject({
      url: '/LibraryAssignments',
      method: 'GET',
    });
    expect(calls[1]).toMatchObject({
      url: '/LibraryAssignments/la1',
      method: 'GET',
    });
    expect(calls[2]).toMatchObject({
      url: '/LibraryAssignments',
      method: 'POST',
    });
    expect(calls[2].data).toEqual({
      parentUuid: 'dev1',
      libraryUuid: 'lib1',
      libraryType: 'Application',
    });
    expect(calls[3]).toMatchObject({
      url: '/LibraryAssignments/la1',
      method: 'DELETE',
    });
  });

  test('library assignments: scoped to a development', async () => {
    const { connection, calls } = mockConnection((req) =>
      req.method === 'POST' ? { uuid: 'la2' } : { value: [] },
    );
    const d = new CalmDevelopment(connection);
    await d.listDevelopmentLibraryAssignments('dev1', ODataQuery.new().top(5));
    await d.createDevelopmentLibraryAssignment('dev1', {
      parentUuid: 'dev1',
      libraryUuid: 'lib1',
    });
    expect(calls[0]).toMatchObject({
      url: '/Developments/dev1/toLibraryAssignments?$top=5',
      method: 'GET',
    });
    expect(calls[1]).toMatchObject({
      url: '/Developments/dev1/toLibraryAssignments',
      method: 'POST',
    });
  });

  test('tag assignments: tenant-wide and per-development', async () => {
    const { connection, calls } = mockConnection(() => ({ value: [] }));
    const d = new CalmDevelopment(connection);
    await d.listTagAssignments();
    await d.listDevelopmentTagAssignments('dev1');
    expect(calls[0].url).toBe('/TagAssignments');
    expect(calls[1].url).toBe('/Developments/dev1/toTagAssignments');
  });

  test('getDevelopmentByExternalReference navigates to toDevelopment', async () => {
    const { connection, calls } = mockConnection(() => ({ uuid: 'dev1' }));
    const d = new CalmDevelopment(connection);
    await d.getDevelopmentByExternalReference('ext1');
    expect(calls[0].url).toBe('/ExternalReferences/ext1/toDevelopment');
    expect(calls[0].method).toBe('GET');
  });

  test('lookups: list sources/types and per-development nav', async () => {
    const { connection, calls } = mockConnection((req) =>
      req.url.includes('/Developments/') ? { code: 'EXTERNAL' } : { value: [] },
    );
    const d = new CalmDevelopment(connection);
    await d.listSources();
    await d.listTypes();
    await d.getSource('dev1');
    await d.getType('dev1');
    expect(calls[0].url).toBe('/DevelopmentSources');
    expect(calls[1].url).toBe('/DevelopmentTypes');
    expect(calls[2].url).toBe('/Developments/dev1/toSource');
    expect(calls[3].url).toBe('/Developments/dev1/toDevelopmentType');
  });
});
