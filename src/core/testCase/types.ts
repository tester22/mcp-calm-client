export interface ITestCase {
  uuid?: string;
  title?: string;
  description?: string;
  statusCode?: string;
  projectId?: string;
  scopeId?: string;
  /** Whether the test case has been prepared. */
  isPrepared?: boolean;
  solutionProcessId?: string;
  solutionProcessFlowId?: string;
  solutionProcessFlowDiagramId?: string;
  contentPackageId?: string;
  modifiedAt?: string;
  createdAt?: string;
}

/**
 * Test activity (a step within a test case that groups related actions).
 *
 * Note: the wire field is `parent_ID` (not camelCase), matching the Cloud ALM API.
 */
export interface ITestActivity {
  uuid?: string;
  title?: string;
  description?: string;
  sequence?: number;
  /** Whether the activity is in scope. */
  isInScope?: boolean;
  parent_ID?: string;
  modifiedAt?: string;
}

/**
 * Test action (an individual step within an activity).
 *
 * Note: the wire field is `parent_ID` (not camelCase), matching the Cloud ALM API.
 */
export interface ITestAction {
  uuid?: string;
  title?: string;
  description?: string;
  expectedResult?: string;
  sequence?: number;
  isEvidenceRequired?: boolean;
  parent_ID?: string;
  modifiedAt?: string;
}

/** External reference attached to a test case. */
export interface ITestReference {
  uuid?: string;
  name?: string;
  url?: string;
  parentTestCase_ID?: string;
}

/** Application linked to a test activity. */
export interface ITestApplication {
  uuid?: string;
  title?: string;
  url?: string;
  parent_ID?: string;
}

/** Tag assignment attached to a test case. */
export interface ITestTagAssignment {
  label?: string;
  groupLabel?: string;
  parent?: string;
}

export interface ICreateTestCaseParams {
  title: string;
  projectId?: string;
  scopeId?: string;
  isPrepared?: boolean;
  solutionProcessId?: string;
  solutionProcessFlowId?: string;
  solutionProcessFlowDiagramId?: string;
  contentPackageId?: string;
  description?: string;
}

export interface IUpdateTestCaseParams {
  title?: string;
  description?: string;
  statusCode?: string;
  scopeId?: string;
  isPrepared?: boolean;
  solutionProcessId?: string;
  solutionProcessFlowId?: string;
  solutionProcessFlowDiagramId?: string;
  contentPackageId?: string;
}

/** Create an activity via the top-level `/Activities` set (`parent_ID` required). */
export interface ICreateTestActivityParams {
  title: string;
  parent_ID: string;
  description?: string;
  sequence?: number;
  isInScope?: boolean;
}

/**
 * Create an activity nested under a test case
 * (`POST /ManualTestCases/{uuid}/toActivities`) — the parent is taken from
 * the URL, so `parent_ID` is optional here.
 */
export interface ICreateTestCaseActivityParams {
  title: string;
  parent_ID?: string;
  description?: string;
  sequence?: number;
  isInScope?: boolean;
}

export interface IUpdateTestActivityParams {
  title?: string;
  description?: string;
  sequence?: number;
  isInScope?: boolean;
}

/** Create an action via the top-level `/Actions` set (`parent_ID` required). */
export interface ICreateTestActionParams {
  title: string;
  parent_ID: string;
  description?: string;
  expectedResult?: string;
  sequence?: number;
  isEvidenceRequired?: boolean;
}

/**
 * Create an action nested under an activity
 * (`POST /Activities/{uuid}/toActions`) — the parent is taken from the URL,
 * so `parent_ID` is optional here.
 */
export interface ICreateActivityActionParams {
  title: string;
  parent_ID?: string;
  description?: string;
  expectedResult?: string;
  sequence?: number;
  isEvidenceRequired?: boolean;
}

export interface IUpdateTestActionParams {
  title?: string;
  description?: string;
  expectedResult?: string;
  sequence?: number;
  isEvidenceRequired?: boolean;
}

/**
 * Create a reference nested under a test case
 * (`POST /ManualTestCases/{uuid}/toReferences`). `parentTestCase_ID` is
 * optional since the parent is also carried on the URL.
 */
export interface ICreateTestReferenceParams {
  name: string;
  url?: string;
  parentTestCase_ID?: string;
}

/**
 * Create an application nested under an activity
 * (`POST /Activities/{uuid}/toApplications`). `parent_ID` is optional since
 * the parent is also carried on the URL.
 */
export interface ICreateTestApplicationParams {
  title: string;
  url?: string;
  parent_ID?: string;
}
