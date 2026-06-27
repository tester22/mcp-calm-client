/**
 * Cross-Library Development development-type codes. If no value is supplied
 * on create, Cloud ALM defaults to `DEV_CUSTOM_FIORI_APPLICATION`.
 */
export type DevelopmentTypeCode =
  | 'DEV_BTP_APP_EXTENSION'
  | 'DEV_CLASS_INTERFACE'
  | 'DEV_CLASSIC_BADI_IMPLEMENTATION'
  | 'DEV_CUSTOM_FIORI_APPLICATION'
  | 'DEV_ENHANCEMENT_IMPLEMENTATION'
  | 'DEV_EXTRA_WORKBENCH_OBJECT'
  | 'DEV_FUNCTION_GROUP'
  | 'DEV_FUNCTION_MODULE'
  | 'DEV_PACKAGE'
  | 'DEV_PROGRAM'
  | 'DEV_TABLE'
  | 'DEV_TRANSACTION';

/** Development source codes. */
export type DevelopmentSourceCode = 'MANUAL' | 'SOLMAN' | 'EXTERNAL';

/**
 * Public Cross-Library Development entity (shape returned by the
 * Cross-Library Developments API). All fields are optional because Cloud ALM
 * may omit unset values.
 */
export interface IDevelopment {
  uuid?: string;
  /** ID of the application, e.g. `15-19`. */
  displayId?: string;
  title?: string;
  description?: string;
  developmentTypeCode?: DevelopmentTypeCode;
  developmentId?: string;
  url?: string;
  /** Email address of the owner. */
  ownerId?: string;
  systemGroupId?: string;
  systemGroupName?: string;
  solutionComponentId?: string;
  solutionComponentName?: string;
  createdAt?: string;
  modifiedAt?: string;
  sourceCode?: DevelopmentSourceCode;
  /** Populated when expanded via `$expand=toSource`. */
  toSource?: IDevelopmentSource;
  /** Populated when expanded via `$expand=toDevelopmentType`. */
  toDevelopmentType?: IDevelopmentType;
  /** Populated when expanded via `$expand=toLibraryAssignments`. */
  toLibraryAssignments?: ILibraryAssignment[];
  /** Populated when expanded via `$expand=toTagAssignments`. */
  toTagAssignments?: ITagAssignment[];
  /** Populated when expanded via `$expand=toExternalReferences`. */
  toExternalReferences?: IDevelopmentExternalReference[];
}

/** Development source lookup value. */
export interface IDevelopmentSource {
  code: DevelopmentSourceCode;
  name?: string;
}

/** Development type lookup value. */
export interface IDevelopmentType {
  code: DevelopmentTypeCode;
  name?: string;
}

/**
 * Library element assigned to a development — the "library item" link.
 * Assigns applications, configurations, developments and interfaces from the
 * Cloud ALM library to a cross-library development.
 */
export interface ILibraryAssignment {
  uuid?: string;
  parentUuid?: string;
  /** Library element identifier (uuid). */
  libraryUuid?: string;
  /** Library type, e.g. `Application`, `Configuration`, `Interface`, `Development`. */
  libraryType?: string;
}

/** External reference owned by a development. */
export interface IDevelopmentExternalReference {
  uuid?: string;
  /** Name of the external reference. */
  name?: string;
  /** URL of the external reference. */
  url?: string;
  externalReferenceId?: string;
  developmentUUID?: string;
}

/** Tag assignment attached to a development. */
export interface ITagAssignment {
  label?: string;
  groupLabel?: string;
  parent?: string;
}

/**
 * Payload for creating a development. `title` is required; all other fields
 * may be omitted. Library assignments and external references may be created
 * inline alongside the development.
 */
export interface ICreateDevelopmentParams {
  title: string;
  description?: string;
  developmentTypeCode?: DevelopmentTypeCode;
  developmentId?: string;
  url?: string;
  /** Email address of the owner. */
  ownerId?: string;
  systemGroupId?: string;
  solutionComponentId?: string;
  toLibraryAssignments?: ICreateLibraryAssignmentParams[];
  toExternalReferences?: ICreateDevelopmentExternalReferenceParams[];
}

/**
 * Payload for updating a development. All fields are optional; only provided
 * fields are sent.
 */
export interface IUpdateDevelopmentParams {
  title?: string;
  description?: string;
  developmentTypeCode?: DevelopmentTypeCode;
  developmentId?: string;
  url?: string;
  ownerId?: string;
  systemGroupId?: string;
  solutionComponentId?: string;
  toLibraryAssignments?: ICreateLibraryAssignmentParams[];
  toExternalReferences?: ICreateDevelopmentExternalReferenceParams[];
}

/**
 * Payload for assigning a library element to a development. `parentUuid`
 * (the owning development uuid) and `libraryUuid` are required.
 */
export interface ICreateLibraryAssignmentParams {
  parentUuid: string;
  /** Library element identifier (uuid). */
  libraryUuid: string;
  /** Library type, e.g. `Application`, `Configuration`, `Interface`, `Development`. */
  libraryType?: string;
}

/** Payload for creating an external reference inline on a development. */
export interface ICreateDevelopmentExternalReferenceParams {
  name: string;
  url?: string;
  externalReferenceId?: string;
}
