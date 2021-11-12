import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddoreditComponent } from './components/addoredit/addoredit.component';
import { DisplayComponent } from './components/display/display.component';
import { ConfigureComponent } from './components/configure/configure.component';
import { DeleteComponent } from './components/delete/delete.component';

export const routes: Routes = [
  { path: '', component: ConfigureComponent },
  { path: 'configure', component: ConfigureComponent },
  { path: 'display', component: DisplayComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddoreditComponent,
    DisplayComponent,
    ConfigureComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
