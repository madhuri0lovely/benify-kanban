import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const getState = createFeatureSelector<AppState>("kanban");

export const getEntities = createSelector(getState, (state: AppState) => {
  return state.entities as Record<number, any>;
});

export const getTodoIdsList = createSelector(getState, (state: AppState) => {
  return state.todo;
});

export const getDoingIdsList = createSelector(getState, (state: AppState) => {
  return state.doing;
});

export const getDoneIdsList = createSelector(getState, (state: AppState) => {
  return state.done;
});

export const getTodo = createSelector(
  getEntities,
  getTodoIdsList,
  (entities, todo) => {
    const retArr: any[] = todo.map((id: number) => entities[id]);
    return retArr;
  }
);

export const getDoing = createSelector(
  getEntities,
  getDoingIdsList,
  (entities, doing) => {
    const retArr = [];
    for (const id of doing) {
      retArr.push(entities[id]);
    }
    return retArr;
  }
);

export const getDone = createSelector(
  getEntities,
  getDoneIdsList,
  (entities, done) => {
    const retArr = [];
    for (const id of done) {
      retArr.push(entities[id]);
    }
    return retArr;
  }
);
