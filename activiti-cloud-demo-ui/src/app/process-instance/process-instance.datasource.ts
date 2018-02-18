import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ProcessInstanceService } from './process-instance.service';
import { ProcessInstance } from './process-instance.model';
import { ProcessResponse, ProcessResponseQuery } from './process-response.model';
import { Page } from './page.model';

export class ProcessInstanceDataSource implements DataSource<ProcessInstance> {

  private processInstanceSubject = new BehaviorSubject<ProcessInstance[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalSubject = new BehaviorSubject<number>(0);

  private processInstances: ProcessInstance[];


  public loading$ = this.loadingSubject.asObservable();
  public total$ = this.totalSubject.asObservable();

  constructor(private processService: ProcessInstanceService) { }

  connect(): Observable<any[]> {
    return this.processInstanceSubject.asObservable();
  }

  update(row) {
    const index: number = this.processInstances.findIndex(el => el.processInstanceId === row.processInstanceId);
    this.processInstances.splice(index, 1, row);
    this.processInstanceSubject.next(this.processInstances);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.processInstanceSubject.complete();
    this.loadingSubject.complete();
    this.totalSubject.complete();
  }

  loadProcessIntance(runtimebundle: string, filter: string,
    sortDirection: string = 'asc', pageIndex: number, pageSize: number) {

    this.loadingSubject.next(true);

    this.processService.list(runtimebundle, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((intances: ProcessResponse) => {
        this.processInstances = Object.assign([], intances._embedded.processInstanceList);
        this.processInstanceSubject.next(intances._embedded.processInstanceList);
        const page: Page = intances.page;
        this.totalSubject.next(page.totalElements);
      });
  }

  queryProcessIntance(
    sortProperty: string,
    sortDirection: string = 'asc', pageIndex: number, pageSize: number) {

    this.loadingSubject.next(true);

    this.processService.query(pageIndex, pageSize, sortProperty, sortDirection).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((intances: ProcessResponseQuery) => {
        this.processInstances = Object.assign([], intances._embedded['process-instances']);
        this.processInstanceSubject.next(intances._embedded['process-instances']);
        const page: Page = intances.page;
        this.totalSubject.next(page.totalElements);
      });

  }
}
