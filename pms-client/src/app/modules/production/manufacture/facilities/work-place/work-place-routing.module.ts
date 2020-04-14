import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { WorkPlaceComponent } from './work-place.component';

export const routers: Routes = [
    {
        path: '',
        component: WorkPlaceComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routers)],
    exports: [RouterModule]
})

export class WorkPlaceRoutingModule { }