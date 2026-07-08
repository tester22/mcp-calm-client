import type { ICalmConnection } from '@mcp-abap-adt/interfaces';
import type { IODataCollection } from '../../odata/ODataCollection';
import type { ODataQuery } from '../../odata/ODataQuery';
import {
  createActivityAction,
  createTestAction,
  deleteTestAction,
  getTestAction,
  listTestActions,
  updateTestAction,
} from './actions';
import {
  createTestActivity,
  createTestCaseActivity,
  deleteTestActivity,
  getTestActivity,
  listTestActivities,
  listTestCaseActivities,
  updateTestActivity,
} from './activities';
import {
  createActivityApplication,
  listActivityApplications,
} from './applications';
import { createTestCase } from './create';
import { deleteTestCase, forceDeleteTestCase } from './delete';
import { getTestCase } from './get';
import { listTestCases } from './list';
import { createTestCaseReference, listTestCaseReferences } from './references';
import {
  listTestCaseTagAssignments,
  listTestTagAssignments,
} from './tagAssignments';
import type {
  ICreateActivityActionParams,
  ICreateTestActionParams,
  ICreateTestActivityParams,
  ICreateTestApplicationParams,
  ICreateTestCaseActivityParams,
  ICreateTestCaseParams,
  ICreateTestReferenceParams,
  ITestAction,
  ITestActivity,
  ITestApplication,
  ITestCase,
  ITestReference,
  ITestTagAssignment,
  IUpdateTestActionParams,
  IUpdateTestActivityParams,
  IUpdateTestCaseParams,
} from './types';
import { updateTestCase } from './update';

/**
 * Handler for the Cloud ALM Test Management OData service
 * (`/calm-testmanagement/v1`).
 *
 * Exposes full CRUD for manual test cases and their nested entities —
 * activities, actions, references, applications — plus tag assignments and
 * the force-delete operation. Cloud ALM keeps activities and actions at
 * top-level OData entity sets linked to their parent by `parent_ID`, and also
 * offers `to*` navigation paths for creating them in the context of a parent.
 */
export class CalmTestCase {
  private readonly connection: ICalmConnection;

  constructor(connection: ICalmConnection) {
    this.connection = connection;
  }

  // ── Test cases ────────────────────────────────────────────────────────────

  list(query?: ODataQuery): Promise<IODataCollection<ITestCase>> {
    return listTestCases(this.connection, query);
  }

  get(uuid: string): Promise<ITestCase> {
    return getTestCase(this.connection, uuid);
  }

  create(params: ICreateTestCaseParams): Promise<ITestCase> {
    return createTestCase(this.connection, params);
  }

  update(uuid: string, params: IUpdateTestCaseParams): Promise<ITestCase> {
    return updateTestCase(this.connection, uuid, params);
  }

  delete(uuid: string): Promise<void> {
    return deleteTestCase(this.connection, uuid);
  }

  /** Delete a test case together with its test runs and results. */
  forceDelete(uuid: string): Promise<void> {
    return forceDeleteTestCase(this.connection, uuid);
  }

  // ── Activities ────────────────────────────────────────────────────────────

  listActivities(query?: ODataQuery): Promise<IODataCollection<ITestActivity>> {
    return listTestActivities(this.connection, query);
  }

  getActivity(uuid: string): Promise<ITestActivity> {
    return getTestActivity(this.connection, uuid);
  }

  createActivity(params: ICreateTestActivityParams): Promise<ITestActivity> {
    return createTestActivity(this.connection, params);
  }

  updateActivity(
    uuid: string,
    params: IUpdateTestActivityParams,
  ): Promise<ITestActivity> {
    return updateTestActivity(this.connection, uuid, params);
  }

  deleteActivity(uuid: string): Promise<void> {
    return deleteTestActivity(this.connection, uuid);
  }

  listTestCaseActivities(
    testCaseUuid: string,
    query?: ODataQuery,
  ): Promise<IODataCollection<ITestActivity>> {
    return listTestCaseActivities(this.connection, testCaseUuid, query);
  }

  createTestCaseActivity(
    testCaseUuid: string,
    params: ICreateTestCaseActivityParams,
  ): Promise<ITestActivity> {
    return createTestCaseActivity(this.connection, testCaseUuid, params);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  listActions(query?: ODataQuery): Promise<IODataCollection<ITestAction>> {
    return listTestActions(this.connection, query);
  }

  getAction(uuid: string): Promise<ITestAction> {
    return getTestAction(this.connection, uuid);
  }

  createAction(params: ICreateTestActionParams): Promise<ITestAction> {
    return createTestAction(this.connection, params);
  }

  updateAction(
    uuid: string,
    params: IUpdateTestActionParams,
  ): Promise<ITestAction> {
    return updateTestAction(this.connection, uuid, params);
  }

  deleteAction(uuid: string): Promise<void> {
    return deleteTestAction(this.connection, uuid);
  }

  createActivityAction(
    activityUuid: string,
    params: ICreateActivityActionParams,
  ): Promise<ITestAction> {
    return createActivityAction(this.connection, activityUuid, params);
  }

  // ── References ────────────────────────────────────────────────────────────

  listTestCaseReferences(
    testCaseUuid: string,
    query?: ODataQuery,
  ): Promise<IODataCollection<ITestReference>> {
    return listTestCaseReferences(this.connection, testCaseUuid, query);
  }

  createTestCaseReference(
    testCaseUuid: string,
    params: ICreateTestReferenceParams,
  ): Promise<ITestReference> {
    return createTestCaseReference(this.connection, testCaseUuid, params);
  }

  // ── Applications ──────────────────────────────────────────────────────────

  listActivityApplications(
    activityUuid: string,
    query?: ODataQuery,
  ): Promise<IODataCollection<ITestApplication>> {
    return listActivityApplications(this.connection, activityUuid, query);
  }

  createActivityApplication(
    activityUuid: string,
    params: ICreateTestApplicationParams,
  ): Promise<ITestApplication> {
    return createActivityApplication(this.connection, activityUuid, params);
  }

  // ── Tag assignments ───────────────────────────────────────────────────────

  listTagAssignments(
    query?: ODataQuery,
  ): Promise<IODataCollection<ITestTagAssignment>> {
    return listTestTagAssignments(this.connection, query);
  }

  listTestCaseTagAssignments(
    testCaseUuid: string,
    query?: ODataQuery,
  ): Promise<IODataCollection<ITestTagAssignment>> {
    return listTestCaseTagAssignments(this.connection, testCaseUuid, query);
  }
}
