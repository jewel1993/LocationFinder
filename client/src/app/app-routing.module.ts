import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoListComponent } from './demo-list/demo-list.component';
import { DataTableComponent } from './data-table/data-table.component';


const routes: Routes = [
  { path:'', component: DataTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DemoListComponent, DataTableComponent]