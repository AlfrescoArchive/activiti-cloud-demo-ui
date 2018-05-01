export type Query = {
  data: QueryProcess;
  error: any;
};

export type QueryProcess = {
  ProcessInstances: Select;
};

export type Select = {
  select: ProcessInstances[];
};

export type ProcessInstances = {
  processInstanceId: string;
  processDefinitionId: string;
  status: string;
  applicationName: string;
};
