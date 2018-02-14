export interface ProcessInstance {
    id?: string;
    initiator?: string;
    processInstanceId?: string;
    processDefinitionId?: string;
    processDefinitionKey?: string;
    startDate?: string;
    status?: string;
    lastModified?: string;
}

export interface ProcessInstanceQuery {
  applicationName?: string;
  processInstanceId?: string;
  processDefinitionId?: string;
  status?: string;
  lastModified?: string;
}
