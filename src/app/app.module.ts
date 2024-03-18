import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { StoreModule } from "@ngrx/store";
import { AppReducer } from "./store/app.reducers";
import { DialogComponent } from "./dialog/dialog.component";
import { FormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    // Material modules
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    // Store
    StoreModule.forRoot({
      kanban: AppReducer,
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
