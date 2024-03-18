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
  default as PayloadAction,
  REMOVE_TODO,
  REMOVE_DOING,
  REMOVE_DONE,
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

  /**
   * When moving the task to To Do column
   */
  moveToTodo(id: number) {
    const addTodo: PayloadAction<number> = {
      type: ADD_TODO,
      payload: id,
    };
    const removeDoing: PayloadAction<number> = { type: REMOVE_DOING, payload: id };
    const removeDone: PayloadAction<number> = { type: REMOVE_DONE, payload: id };
    this.store.dispatch(addTodo);
    this.store.dispatch(removeDoing);
    this.store.dispatch(removeDone);
  }

  /**
   * When moving the task to Doing column
   */
  moveToDoing(id: number) {
    const removeTodo: PayloadAction<number> = {
      type: REMOVE_TODO,
      payload: id,
    };
    const addDoing: PayloadAction<number> = { type: ADD_DOING, payload: id };
    const removeDone: PayloadAction<number> = { type: REMOVE_DONE, payload: id };
    this.store.dispatch(removeTodo);
    this.store.dispatch(addDoing);
    this.store.dispatch(removeDone);
  }

  /**
   * When moving the task to To Done column
   */
  moveToDone(id: number) {
    const removeTodo: PayloadAction<number> = {
      type: REMOVE_TODO,
      payload: id,
    };
    const removeDoing: PayloadAction<number> = { type: REMOVE_DOING, payload: id };
    const addDone: PayloadAction<number> = { type: ADD_DONE, payload: id };
    this.store.dispatch(removeTodo);
    this.store.dispatch(removeDoing);
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

  /**
   * When creating new task or story
   */
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
