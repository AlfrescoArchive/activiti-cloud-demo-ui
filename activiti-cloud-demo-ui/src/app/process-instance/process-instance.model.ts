export interface ProcessInstance {
    id?: string;
    initiator?: string;
    processDefinitionId?: string;
    processDefinitionKey?: string;
    startDate?: string;
    status?: string;
    lastModified?: string;
}

export interface ProcessInstanceQuery {
  id?: string;
  applicationName?: string;
  processDefinitionId?: string;
  status?: string;
  lastModified?: string;
}
