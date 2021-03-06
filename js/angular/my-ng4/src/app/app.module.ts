import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";

import {TestServiceModule} from "./test-service/test-service.module";
import {TestComponentModule} from "./test-component/test-component.module";
import {TestPipeModule} from "./test-pipe/test-pipe.module";
import {TestDirectiveModule} from "./test-directive/test-directive.module";

import {AppRoutingModule} from "./app-routing.module";
import {AaaComponent} from "./test-route/aaa/aaa.component";

import {Routes} from "@angular/router";

const routes: Routes = [
  {path: '', redirectTo: '/aaa', pathMatch: 'full'},
  {path: 'aaa', component: AaaComponent},
  //{path: 'aaa', loadChildren: './test-route/aaa/aaa.module#AaaModule'},
  //{path: 'bbb', loadChildren: './test-route/bbb/bbb.module#BbbModule'}
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    TestServiceModule,
    TestComponentModule,
    TestPipeModule,
    TestDirectiveModule,

    // RouterModule,
    AppRoutingModule

    // RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    AaaComponent  // router 默认显示的组件
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
