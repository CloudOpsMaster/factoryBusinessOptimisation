import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { DepartmentComponent } from './department.component';
import { DepartmentFormComponent } from './department-form/department-form.component';

export const routers: Routes = [
    {
        path: '',
        component: DepartmentComponent,
    },
    {
        path: 'form',
        component:DepartmentFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routers)],
    exports: [RouterModule]
})

export class DepartmentRoutingModule { }