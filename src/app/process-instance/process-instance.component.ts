import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { startWith, tap, delay } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { ProcessInstanceService } from './process-instance.service';
import { ProcessInstance, ProcessInstanceQueryEntry } from './process-instance.model';
import { ProcessInstanceDataSource } from './process-instance.datasource';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-process-instance',
  templateUrl: './process-instance.component.html',
  styleUrls: ['./process-instance.component.scss']
})
export class ProcessInstanceComponent implements OnInit, AfterViewInit {
  private instances: ProcessInstance[];
  dataSource: ProcessInstanceDataSource;
  displayedColumns = ['id', 'applicationName', 'status', 'processDefinitionId', 'lastModified', 'actions'];
  total: number;

  actions: Array<any> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private processInstanceService: ProcessInstanceService) { }

  ngOnInit() {
    this.dataSource = new ProcessInstanceDataSource(this.processInstanceService);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      startWith(null),
      delay(0),
      tap(() => this.queryInstances())
      )
      .subscribe();
  }

  queryInstances(): void {
    this.dataSource.queryProcessInstance(
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  performAction(row: ProcessInstanceQueryEntry, key: string) {
    if (key === 'suspend') {
      this.suspend(row);
    } else {
      this.activate(row);
    }
  }

  activate(row: ProcessInstanceQueryEntry): void {
    this.processInstanceService.activate(row.entry.applicationName, row.entry.id)
    .subscribe(
      (response) => {
        const mockRes = <ProcessInstanceQueryEntry>{
          entry: {
          applicationName: row.entry.applicationName,
          id: row.entry.id,
          processDefinitionId: row.entry.processDefinitionId,
          lastModified: row.entry.lastModified,
          status: 'RUNNING'
          }
        };
        this.dataSource.update(mockRes);
        console.log('POST call successful value returned in body');
    },
      (error) => {
        console.log('POST call in error', error.message);
      },
      () => {
        console.log('The POST observable is now completed.');
      });
  }

  suspend(row: ProcessInstanceQueryEntry): void {
    this.processInstanceService.suspend(row.entry.applicationName, row.entry.id)
    .subscribe(
      (response) => {
        const mockRes = <ProcessInstanceQueryEntry>{
          entry : {
          applicationName: row.entry.applicationName,
          id: row.entry.id,
          processDefinitionId: row.entry.processDefinitionId,
          lastModified: row.entry.lastModified,
          status: 'SUSPENDED'
          }
        };
        this.dataSource.update(mockRes);
        console.log('POST call successful value returned in body');
    },
      error => {
        console.log('POST call in error', error.message);
      },
      () => {
        console.log('The POST observable is now completed.');
      });
  }

  onRowClick(row: ProcessInstanceQueryEntry) {
    this.actions = [];
    if (row.entry.status === 'RUNNING') {
      this.actions.push({ key: 'suspend', icon: 'pause', label: 'Suspend' });
    } else {
      this.actions.push({ key: 'activate', icon: 'repeat', label: 'Activate' });
    }
  }

}
