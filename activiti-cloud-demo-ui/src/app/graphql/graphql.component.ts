import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ProcessInstances, Query } from './types';
import { DataSource } from '@angular/cdk/collections';

import gql from 'graphql-tag';

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.scss']
})
export class GraphqlComponent implements OnInit {
  processes: ProcessInstances[];
  displayedColumns = ['processInstanceId', 'applicationName', 'status', 'processDefinitionId', 'lastModified'];
  datasource: StaticDataSource;
  errors: any[];
  showRaw = false;
  query = `query processes {
    ProcessInstances {
      select {
        processInstanceId
        status
        applicationName
        lastModified
      }
    }
  }`;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
  }

  toggle() {
    this.showRaw = !this.showRaw;
  }

  submit() {
    const data = this.apollo.watchQuery<Query>({
      query: gql`
        ${this.query}
      `,
    })
      .valueChanges;

    data.subscribe(
      (resonse) => {
        this.errors = [];
        this.processes = resonse.data['ProcessInstances'].select;
        this.datasource = new StaticDataSource(this.processes);

      }, (error) => {
        this.processes = [];
        this.errors = error.graphQLErrors;
      });
  }
}

export class StaticDataSource extends DataSource<ProcessInstances> {
  constructor(private staticData: ProcessInstances[]) {
    super();
  }

  connect(): Observable<ProcessInstances[]> {
    return Observable.of(this.staticData);
  }

  disconnect() {}
}
