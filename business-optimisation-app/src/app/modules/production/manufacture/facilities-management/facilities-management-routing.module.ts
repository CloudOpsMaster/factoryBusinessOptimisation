import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilitiesManagementComponent } from './facilities-management.component';

const routes: Routes = [
    {
        path: '',
        component: FacilitiesManagementComponent,
        children: [
            {
                path: 'locations',
                loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
            },
            {
                path: 'departments',
                loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
            },
            {
                path: 'workplace',
                loadChildren: () => import('./work-place/work-place.module').then(m=>m.WorkPlaceModule)
            },
            {
                path: 'workarea',
                loadChildren: () => import('./work-area/work-area.module').then(m => m.WorkAreaModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FacilitiesManagementRoutingModule { }
