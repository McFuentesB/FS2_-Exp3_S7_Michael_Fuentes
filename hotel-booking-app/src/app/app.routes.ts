import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';  // Importa PerfilComponent
import { RecuperarComponent } from './recuperar/recuperar.component';
import { HomeComponent } from './home/home.component';
import { ReservasComponent } from './reservas/reservas.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de Login
  { path: 'login', component: LoginComponent },  // Ruta de login
  { path: 'registro', component: RegistroComponent },  // Ruta de registro
  { path: 'dashboard', component: DashboardComponent },  // Ruta al Dashboard
  { path: 'perfil', component: PerfilComponent },  // Ruta al Perfil
  { path: 'recuperar', component: RecuperarComponent},
  { path: 'home', component:HomeComponent},
  { path: 'reservas', component:ReservasComponent},
  { path: 'admin', component:AdminDashboardComponent}
];