import { Page } from './page.model';
import { ProcessInstance } from './process-instance.model';
import { ProcessInstanceQuery } from './process-instance.model';

export interface ProcessResponse {
    page: Page;
    _embedded?: { processInstanceList: ProcessInstance[]} ;
    _links?: any;
}


export interface ProcessResponseQuery {
  page: Page;
  _embedded?: { 'process-instances': ProcessInstanceQuery[]} ;
  _links?: any;
}
