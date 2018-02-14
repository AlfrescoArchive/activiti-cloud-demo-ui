import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { pathApi } from '../utils/path-api';
import { ProcessInstance } from './process-instance.model';
import { ProcessResponse } from './process-response.model';
import { ProcessResponseQuery } from './process-response.model';
import { AppConfigService } from '@alfresco/adf-core';

@Injectable()
export class ProcessInstanceService {

  apiHost: string;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService) {
  }

  list(runtimeBundle: string, page?: number, size?: number): Observable<ProcessResponse> {
    this.apiHost = this.appConfig.get<string>('apiHost');
    const params = new HttpParams()
      .set('page', page + '')
      .set('size', size + '');

    return this.http
      .get<ProcessResponse>(`${this.apiHost}/${runtimeBundle}/v1/process-instances`, { params: params })
      .map((instances: ProcessResponse) => {
        return instances;
      });
  }

  query(page?: number, size?: number, sortProperty?: string, sortDirection?: string ): Observable<ProcessResponseQuery> {
    let sorting: string;
    if (sortProperty && sortDirection) {
      sorting = `${sortProperty},${sortDirection}`;
    }
    this.apiHost = this.appConfig.get<string>('apiHost');
    const params = new HttpParams()
      .set('page', page + '')
      .set('size', size + '')
      .set('sort', sorting);

    return this.http
      .get<ProcessResponseQuery>(`${this.apiHost}/query/v1/process-instances`, { params: params })
      .map((instances: ProcessResponseQuery) => {
        return instances;
      });
  }

  suspend(runtimeBundle: string, processInstanceId: string) {
    if (!!runtimeBundle && !!processInstanceId) {
      this.apiHost = this.appConfig.get<string>('apiHost');
      return this.http.post(`${pathApi.dotaApi}/${runtimeBundle}/v1/process-instances/${processInstanceId}/suspend`,
        undefined);
    }
  }

  activate(runtimeBundle: string, processInstanceId: string) {
    if (!!runtimeBundle && !!processInstanceId) {
      this.apiHost = this.appConfig.get<string>('apiHost');
      return this.http.post(`${pathApi.dotaApi}/${runtimeBundle}/v1/process-instances/${processInstanceId}/activate`,
        undefined);
    }
  }
}
