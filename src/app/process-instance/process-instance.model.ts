export interface ProcessInstance {
    id?: string;
    applicationName?: string;
    initiator?: string;
    processDefinitionId?: string;
    processDefinitionKey?: string;
    startDate?: string;
    status?: string;
    lastModified?: string;
}

export interface ProcessInstanceQueryEntry {
  entry: ProcessInstance;
}
