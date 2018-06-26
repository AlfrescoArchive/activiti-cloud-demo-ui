import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppConfigService } from '@alfresco/adf-core';

const endPoint = '/admin/query/graphql';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  host: string;
  constructor(
    apollo: Apollo,
    private appConfig: AppConfigService,
    httpLink: HttpLink
  ) {
    this.appConfig.load().then(() => {
      const uri = this.appConfig.get<string>('apiHost') + endPoint;
      // create Apollo
      apollo.create({
        link: httpLink.create({ uri }),
        cache: new InMemoryCache({ addTypename: false })
      });
    });
  }
}
