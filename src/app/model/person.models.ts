
//fd6fe9cd-fbb1-44ec-9a4a-45de05b144ed

export interface PersonResponse {
  value: Value;
  errors: any[];
  success: boolean;
}

export interface Value {
  userName: string;
  name: string;
  email: string;
  isAdmin: boolean;
  surveys: Survey[];
  created: Date;
  createdBy: null;
  lastModified: Date;
  lastModifiedBy: null;
  id: string;
}

export interface Survey {
  personId: string;
  title: string;
  description: string;
  startDate: Date;
  questions: any[];
  person: null;
  created: Date;
  createdBy: string;
  lastModified: Date;
  lastModifiedBy: string;
  id: string;
}

export interface PersonUpdate {
  id: string;
  nameUser: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
