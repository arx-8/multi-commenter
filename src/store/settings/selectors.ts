import { RootState } from "src/store/store"

export const isLoadedYouTubeData = (rootState: RootState): boolean => {
  const state = rootState.settings
  return !state.ui.youTubeData.isLoading && !!state.youTubeData
}
