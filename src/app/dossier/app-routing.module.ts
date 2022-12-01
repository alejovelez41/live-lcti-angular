import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";




const routes: Routes = [
    {
        path: 'dossiers',
        loadChildren: () => import('./dossiers/dossiers.module').then(m => m.DossiersModule)
    },
    {
        path: 'parametres',
        loadChildren: () => import('./parametres/parametres.module').then(m => m.ParametresModule)
    },
    {
        path: 'controle',
        loadChildren: () => import('./controle/controle.module').then(m => m.ControleModule)
    },
    {
        path: 'entreprise',
        loadChildren: () => import('./entreprise/entreprise.module').then(m => m.EntrepriseModule)
    },
    {
        path: 'formulaires',
        loadChildren: () => import('./formulaires/formulaires.module').then(m => m.FormulairesModule)
    },
    {
        path: 'outils',
        loadChildren: () => import('./outils/outils.module').then(m => m.OutilsModule)
    },
    {
        path: '**',
        redirectTo: 'dossiers'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {}
    


