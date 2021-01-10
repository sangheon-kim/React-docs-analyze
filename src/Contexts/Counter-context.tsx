import * as React from "react";

export const INCREMENT = "counter/INCREMET";
export const DECREMENT = "counter/DECREMENT";

type Action = { type: typeof INCREMENT } | { type: typeof DECREMENT };
type Dispatch = (action: Action) => void;
type State = { count: number };
type CountProviderProps = { children: React.ReactElement | React.ReactElement[] };

export const CountStateContext = React.createContext<State | undefined>(undefined);
CountStateContext.displayName = "ChangeCountStateName";
export const CountDispatchContext = React.createContext<Dispatch | undefined>(undefined);
CountDispatchContext.displayName = "ChangeCountDispatchName";

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case INCREMENT: {
      return { ...state, count: state.count + 1 };
    }
    case DECREMENT: {
      return { ...state, count: state.count - 1 };
    }
    default:
      console.error(new Error(`Unhandled action type: ${(action as any).type}`));
      return state;
  }
}

function CountProvider({ children }: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>{children}</CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function useCountState() {
  const context = React.useContext(CountStateContext);

  if (context === undefined) {
    throw new Error(`useCountState must be used within a CountProvider`);
  }

  return context;
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error(`useCountDispatch must me used within a CountProvider`);
  }

  return context;
}

export { CountProvider, useCountState, useCountDispatch };
