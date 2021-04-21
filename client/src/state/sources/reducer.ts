export interface SourcesState {}

const initialState: SourcesState = {
  activeSources: {},
};

export function sourcesReducer(state: SourcesState = initialState): SourcesState {
  return state;
}
