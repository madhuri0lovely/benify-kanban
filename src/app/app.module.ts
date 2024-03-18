import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { StoreModule } from "@ngrx/store";
import { AppReducer } from "./store/app.reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { DialogComponent } from "./dialog/dialog.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    // Material modules
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,

    // Store
    StoreModule.forRoot({
      kanban: AppReducer,
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
