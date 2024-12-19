import { AppStateInterface } from "../../core/models";
import {createSelector} from "@ngrx/store";

export const selectFeature = (state: AppStateInterface) => state.weather;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
)

export const citiesSelector = createSelector(
  selectFeature,
  (state) => state.cities
)

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
)
