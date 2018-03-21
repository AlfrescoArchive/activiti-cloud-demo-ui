import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ProcessInstanceService } from './process-instance.service';
import { ProcessInstance, ProcessInstanceQueryEntry } from './process-instance.model';
import { ProcessResponseQuery, } from './process-response.model';
import { Page, PaginationModel } from './page.model';

export class ProcessInstanceDataSource implements DataSource<ProcessInstanceQueryEntry> {

  private processInstanceSubject = new BehaviorSubject<ProcessInstanceQueryEntry[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalSubject = new BehaviorSubject<number>(0);

  private processInstances: ProcessInstanceQueryEntry[];


  public loading$ = this.loadingSubject.asObservable();
  public total$ = this.totalSubject.asObservable();

  constructor(private processService: ProcessInstanceService) { }

  connect(): Observable<any[]> {
    return this.processInstanceSubject.asObservable();
  }

  update(row: ProcessInstanceQueryEntry) {
    const index: number = this.processInstances.findIndex(el => el.entry.id === row.entry.id);
    this.processInstances.splice(index, 1, row);
    this.processInstanceSubject.next(this.processInstances);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.processInstanceSubject.complete();
    this.loadingSubject.complete();
    this.totalSubject.complete();
  }

  queryProcessInstance(
    sortProperty: string,
    sortDirection: string = 'asc', pageIndex: number, pageSize: number) {

    this.loadingSubject.next(true);

    this.processService.query(pageIndex, pageSize, sortProperty, sortDirection).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((instances: ProcessResponseQuery) => {
        if (instances.list) {
          if (instances.list.entries) {
            const entries = instances.list.entries;
            this.processInstances = Object.assign([], entries);
            this.processInstanceSubject.next( this.processInstances );
          }
          const page: PaginationModel = instances.list.pagination;
          this.totalSubject.next(page.totalItems);
        } else {
          this.processInstanceSubject.next([]);
        }
      });

  }
}
