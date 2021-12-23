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
  state: AppState,
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const proxyHandler: ProxyHandler<AppState> = {
    get(target, prop, receiver) {
      if(prop === 'selected') {
        return state.selected;
      }
    },
    set(obj, prop, value) {
      if(prop === 'selected') {
        dispatch({ type: 'toggle' })
      }
      return true;
    }
  }
  const proxy = new Proxy(state, proxyHandler);
  return (
    <>
    <AppContext.Provider value={{
      state: proxy,
    }}>
      {children.children}
    </AppContext.Provider>
    </>
  )
}

export const useAppContext = () => useContext(AppContext);