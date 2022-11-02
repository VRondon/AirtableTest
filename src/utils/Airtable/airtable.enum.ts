import { FieldSet } from 'airtable';
import { registerEnumType } from 'type-graphql';

const enum Departments {
  RRHH = 'RRHH',
  IT = 'IT',
}

const enum Dedication {
  FULL_TIME = 'Full time',
  PART_TIME = 'Part time',
}

export enum UserFilterField {
  COMPANY_EMAIL = 'company_email',
  STATUS = 'status',
}

export enum UserFields {
  NAME = 'Name',
  LASTNAME = 'Lastname',
  DNI = 'DNI',
  PHONE = 'Phone',
  PERSONAL_EMAIL = 'Personal email address',
  COMPANY_EMAIL = 'Company email address',
  ADDRESS = 'Address',
  CITY = 'City',
  STATE = 'State',
  ZIP_CODE = 'ZIP code',
  COUNTRY = 'Country',
  DEPARTMENT = 'Department',
  WORKING_START_DATE = 'Working start date',
  DEDICATION = 'Dedication',
  SALARY = 'Salary',
  STATUS = 'Status',
}

export enum Status {
  ACTIVE = 'Activo',
  INACTIVE = 'Inactivo',
}

export interface Users extends FieldSet {
  [UserFields.NAME]: string;
  [UserFields.LASTNAME]: string;
  [UserFields.DNI]: string;
  [UserFields.PHONE]: string;
  [UserFields.PERSONAL_EMAIL]: string;
  [UserFields.COMPANY_EMAIL]: string;
  [UserFields.ADDRESS]: string;
  [UserFields.CITY]: string;
  [UserFields.STATE]: string;
  [UserFields.ZIP_CODE]: string;
  [UserFields.COUNTRY]: string;
  [UserFields.DEPARTMENT]: Departments;
  [UserFields.WORKING_START_DATE]: string;
  [UserFields.DEDICATION]: Dedication;
  [UserFields.SALARY]: number;
  [UserFields.STATUS]: Status;
}

export type FilterBy = {
  [key in UserFilterField]?: string;
};

registerEnumType(Status, { name: 'Status' });