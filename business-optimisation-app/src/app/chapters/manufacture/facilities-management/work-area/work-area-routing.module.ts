import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { WorkAreaComponent } from './work-area.component';

export const routers: Routes = [
    {
        path: '',
        component: WorkAreaComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routers)],
    exports: [RouterModule]
})

export class WorkAreaRoutingModule { }
