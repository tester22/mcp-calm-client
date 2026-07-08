import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import { createProject } from './create';
import { deleteProject } from './delete';
import { getProgram, getProject } from './get';
import { listPrograms, listProjects } from './list';
import { listProjectTeamMembers, listProjectTimeboxes } from './nested';
import type {
  ICreateProjectParams,
  IProgram,
  IProject,
  ITeamMember,
  ITimebox,
  IUpdateProjectParams,
} from './types';
import { updateProject } from './update';

/**
 * Handler for the Cloud ALM Projects OData service (`/calm-projects/v1`).
 *
 * OData v4 semantics. `list`/`get`/`create` are supported on all tenants;
 * `update`/`delete` rely on the projects fetch/update capability added in
 * 2025 and may return HTTP 405 on older tenants. No update/delete is defined
 * for programs.
 */
export class CalmProject {
  private readonly connection: ICalmConnection;

  constructor(connection: ICalmConnection) {
    this.connection = connection;
  }

  list(query?: ODataQuery): Promise<IODataCollection<IProject>> {
    return listProjects(this.connection, query);
  }

  get(id: string): Promise<IProject> {
    return getProject(this.connection, id);
  }

  create(params: ICreateProjectParams): Promise<IProject> {
    return createProject(this.connection, params);
  }

  update(id: string, params: IUpdateProjectParams): Promise<IProject> {
    return updateProject(this.connection, id, params);
  }

  delete(id: string): Promise<void> {
    return deleteProject(this.connection, id);
  }

  listTimeboxes(
    projectId: string,
    query?: ODataQuery,
  ): Promise<IODataCollection<ITimebox>> {
    return listProjectTimeboxes(this.connection, projectId, query);
  }

  listTeamMembers(
    projectId: string,
    query?: ODataQuery,
  ): Promise<IODataCollection<ITeamMember>> {
    return listProjectTeamMembers(this.connection, projectId, query);
  }

  listPrograms(query?: ODataQuery): Promise<IODataCollection<IProgram>> {
    return listPrograms(this.connection, query);
  }

  getProgram(id: string): Promise<IProgram> {
    return getProgram(this.connection, id);
  }
}
