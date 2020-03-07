import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LocationComponent } from './location.component';

export const routers: Routes = [
    {
        path: '',
        component: LocationComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routers)],
    exports: [RouterModule]
})

export class LocationRoutingModule { }
