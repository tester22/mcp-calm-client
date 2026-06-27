import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import { createDevelopment } from './create';
import { deleteDevelopment } from './delete';
import {
  getDevelopment,
  getDevelopmentByDisplayId,
  getDevelopmentByExternalReference,
  getDevelopmentWithExpand,
} from './get';
import {
  createDevelopmentLibraryAssignment,
  createLibraryAssignment,
  deleteLibraryAssignment,
  getLibraryAssignment,
  listDevelopmentLibraryAssignments,
  listLibraryAssignments,
} from './libraryAssignments';
import { listDevelopments } from './list';
import {
  getDevelopmentSource,
  getDevelopmentType,
  listDevelopmentSources,
  listDevelopmentTypes,
} from './lookups';
import {
  listDevelopmentTagAssignments,
  listTagAssignments,
} from './tagAssignments';
import type {
  ICreateDevelopmentParams,
  ICreateLibraryAssignmentParams,
  IDevelopment,
  IDevelopmentSource,
  IDevelopmentType,
  ILibraryAssignment,
  ITagAssignment,
  IUpdateDevelopmentParams,
} from './types';
import { updateDevelopment } from './update';

/**
 * Handler for the Cloud ALM Cross-Library Developments OData service
 * (`/calm-crosslibrarydevelopments/v1`).
 *
 * Covers developments CRUD plus the surrounding entities — library
 * assignments ("library items"), tag assignments, external references, and
 * the development source/type lookups. All operations delegate to low-level
 * functions in this module; the handler is a thin bound wrapper to give
 * consumers a discoverable API surface.
 */
export class CalmDevelopment {
  private readonly connection: ICalmConnection;

  constructor(connection: ICalmConnection) {
    this.connection = connection;
  }

  // ── Developments ──────────────────────────────────────────────────────────

  list(query?: ODataQuery): Promise<IODataCollection<IDevelopment>> {
    return listDevelopments(this.connection, query);
  }

  get(uuid: string): Promise<IDevelopment> {
    return getDevelopment(this.connection, uuid);
  }

  getByDisplayId(displayId: string): Promise<IDevelopment> {
    return getDevelopmentByDisplayId(this.connection, displayId);
  }

  getWithExpand<T = unknown>(uuid: string, expand: string[]): Promise<T> {
    return getDevelopmentWithExpand<T>(this.connection, uuid, expand);
  }

  create(params: ICreateDevelopmentParams): Promise<IDevelopment> {
    return createDevelopment(this.connection, params);
  }

  update(uuid: string, params: IUpdateDevelopmentParams): Promise<void> {
    return updateDevelopment(this.connection, uuid, params);
  }

  delete(uuid: string): Promise<void> {
    return deleteDevelopment(this.connection, uuid);
  }

  // ── Library assignments ("library items") ─────────────────────────────────

  listLibraryAssignments(
    query?: ODataQuery,
  ): Promise<IODataCollection<ILibraryAssignment>> {
    return listLibraryAssignments(this.connection, query);
  }

  getLibraryAssignment(uuid: string): Promise<ILibraryAssignment> {
    return getLibraryAssignment(this.connection, uuid);
  }

  createLibraryAssignment(
    params: ICreateLibraryAssignmentParams,
  ): Promise<ILibraryAssignment> {
    return createLibraryAssignment(this.connection, params);
  }

  deleteLibraryAssignment(uuid: string): Promise<void> {
    return deleteLibraryAssignment(this.connection, uuid);
  }

  listDevelopmentLibraryAssignments(
    developmentUuid: string,
    query?: ODataQuery,
  ): Promise<IODataCollection<ILibraryAssignment>> {
    return listDevelopmentLibraryAssignments(
      this.connection,
      developmentUuid,
      query,
    );
  }

  createDevelopmentLibraryAssignment(
    developmentUuid: string,
    params: ICreateLibraryAssignmentParams,
  ): Promise<ILibraryAssignment> {
    return createDevelopmentLibraryAssignment(
      this.connection,
      developmentUuid,
      params,
    );
  }

  // ── Tag assignments ───────────────────────────────────────────────────────

  listTagAssignments(
    query?: ODataQuery,
  ): Promise<IODataCollection<ITagAssignment>> {
    return listTagAssignments(this.connection, query);
  }

  listDevelopmentTagAssignments(
    developmentUuid: string,
    query?: ODataQuery,
  ): Promise<IODataCollection<ITagAssignment>> {
    return listDevelopmentTagAssignments(
      this.connection,
      developmentUuid,
      query,
    );
  }

  // ── External references ───────────────────────────────────────────────────

  getDevelopmentByExternalReference(
    externalReferenceUuid: string,
  ): Promise<IDevelopment> {
    return getDevelopmentByExternalReference(
      this.connection,
      externalReferenceUuid,
    );
  }

  // ── Lookups ───────────────────────────────────────────────────────────────

  listSources(
    query?: ODataQuery,
  ): Promise<IODataCollection<IDevelopmentSource>> {
    return listDevelopmentSources(this.connection, query);
  }

  listTypes(query?: ODataQuery): Promise<IODataCollection<IDevelopmentType>> {
    return listDevelopmentTypes(this.connection, query);
  }

  getSource(developmentUuid: string): Promise<IDevelopmentSource> {
    return getDevelopmentSource(this.connection, developmentUuid);
  }

  getType(developmentUuid: string): Promise<IDevelopmentType> {
    return getDevelopmentType(this.connection, developmentUuid);
  }
}
