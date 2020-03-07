import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { DepartmentComponent } from './department.component';

export const routers: Routes = [
    {
        path: '',
        component: DepartmentComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routers)],
    exports: [RouterModule]
})

export class DepartmentRoutingModule { }