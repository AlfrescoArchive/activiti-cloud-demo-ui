import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { pathApi } from '../utils/path-api';
import { ProcessResponseQuery } from './process-response.model';
import { AppConfigService } from '@alfresco/adf-core';

@Injectable()
export class ProcessInstanceService {

  apiHost: string;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService) {
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
      .get<ProcessResponseQuery>(`${this.apiHost}/query/v1/process-instances`, {
        headers: {
          'Accept': 'application/json'
        }, params: params
      })
      .map((instances: ProcessResponseQuery) => {
        return instances;
      });
  }

  suspend(runtimeBundle: string, processInstanceId: string) {
    if (!!runtimeBundle && !!processInstanceId) {
      this.apiHost = this.appConfig.get<string>('apiHost');
      return this.http.post(`${this.apiHost}/${runtimeBundle}/v1/process-instances/${processInstanceId}/suspend`,
        undefined);
    }
  }

  activate(runtimeBundle: string, processInstanceId: string) {
    if (!!runtimeBundle && !!processInstanceId) {
      this.apiHost = this.appConfig.get<string>('apiHost');
      return this.http.post(`${this.apiHost}/${runtimeBundle}/v1/process-instances/${processInstanceId}/activate`,
        undefined);
    }
  }
}
