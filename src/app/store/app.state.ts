/**
 * State model
 */
export interface AppState {
  entities: object;
  todo: number[];
  doing: number[];
  done: number[];
}

/**
 * State initial
 */
export const initializeState = (): AppState => {
  return {
    entities: {},
    todo: [],
    doing: [],
    done: [],
  };
};
