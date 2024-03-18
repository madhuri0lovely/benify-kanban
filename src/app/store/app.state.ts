import { Item } from "./item.model";

/**
 * State model
 */
export interface AppState {
  entities: object; // { (item).id: Item }
  todo: number[];
  doing: number[];
  done: number[];
}

/**
 * State initial shape
 * @returns {AppState}
 */
export const initializeState = (): AppState => {
  return {
    entities: {},
    todo: [],
    doing: [],
    done: [],
  };
};
