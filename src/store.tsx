import React, { useContext, useReducer, ComponentType, ReactNode } from 'react';

interface AppState {
  selected: boolean;
}

type ActionTypes = 'toggle'

interface BaseAction { 
  type: ActionTypes
}

interface SelectAction extends BaseAction {
  type: 'toggle'
}

export function defaultState() {
  return {
    selected: false
  }
}

interface AppContext {
  state: AppState
  dispatch?: React.Dispatch<BaseAction>
}

const AppContext = React.createContext<AppContext>({
  state: defaultState()
});

const reducer = (
  state: AppState, 
  action: SelectAction
): AppState => {
  switch(action.type) {
    case 'toggle':
      return {
        ...state,
        selected: !state.selected
      };
  }
}

export const ContextProvider: ComponentType = (
  children: any,
) => {
  const initialState = defaultState();
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
    <AppContext.Provider value={{
      state,
      dispatch
    }}>
      {children.children}
    </AppContext.Provider>
    </>
  )
}

export const useAppContext = () => useContext(AppContext);