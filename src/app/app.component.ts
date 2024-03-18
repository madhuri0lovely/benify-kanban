///<reference path="store/app.actions.ts"/>
import { Component, OnInit } from "@angular/core";
import { Item } from "./store/item.model";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app.state";
import { Observable } from "rxjs";
import { getTodo, getDoing, getDone, getEntities } from "./store/app.selectors";
import {
  ADD_TODO,
  ADD_DOING,
  ADD_DONE,
  CREATE_ITEM,
  CreateItem,
  default as PayloadAction,
  REM_TODO,
  REM_DOING,
  REM_DONE,
} from "./store/app.actions";
import { DialogComponent } from "./dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  currentCardNum = 0;
  itemEntities$: Observable<object>;
  todoList$: Observable<Item[]>;
  doingList$: Observable<Item[]>;
  doneList$: Observable<Item[]>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.itemEntities$ = this.store.select(getEntities);
    this.todoList$ = this.store.select(getTodo);
    this.doingList$ = this.store.select(getDoing);
    this.doneList$ = this.store.select(getDone);
  }

  moveToTodo(id: number) {
    const addTodo: PayloadAction<number> = {
      type: ADD_TODO,
      payload: id,
    };
    const remDoing: PayloadAction<number> = { type: REM_DOING, payload: id };
    const remDone: PayloadAction<number> = { type: REM_DONE, payload: id };
    this.store.dispatch(addTodo);
    this.store.dispatch(remDoing);
    this.store.dispatch(remDone);
  }

  moveToDoing(id: number) {
    const remTodo: PayloadAction<number> = {
      type: REM_TODO,
      payload: id,
    };
    const addDoing: PayloadAction<number> = { type: ADD_DOING, payload: id };
    const remDone: PayloadAction<number> = { type: REM_DONE, payload: id };
    this.store.dispatch(remTodo);
    this.store.dispatch(addDoing);
    this.store.dispatch(remDone);
  }

  moveToDone(id: number) {
    const remTodo: PayloadAction<number> = {
      type: REM_TODO,
      payload: id,
    };
    const remDoing: PayloadAction<number> = { type: REM_DOING, payload: id };
    const addDone: PayloadAction<number> = { type: ADD_DONE, payload: id };
    this.store.dispatch(remTodo);
    this.store.dispatch(remDoing);
    this.store.dispatch(addDone);
  }

  /**
   * To open Dialog box
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { text: "" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== "") {
        this.createItem(result);
      }
    });
  }

  createItem(text: string) {
    const card = {
      id: this.currentCardNum++,
      text: text,
    };
    const createItemAction: PayloadAction<Item> = {
      type: CREATE_ITEM,
      payload: card,
    };
    this.store.dispatch(createItemAction);
    this.moveToTodo(card.id);
    return card;
  }
}
