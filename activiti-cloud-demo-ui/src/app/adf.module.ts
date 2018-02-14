import { NgModule } from '@angular/core';

// ADF modules
import { CoreModule } from '@alfresco/adf-core';

export function modules() {
  return [
      CoreModule
  ];
}

@NgModule({
  imports: modules(),
  exports: modules()
})
export class AdfModule {}
