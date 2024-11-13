import {createFeature, createSelector, MemoizedSelector} from '@ngrx/store'
import {reducers} from './reducers'
import {AuthStateInterface} from '../types/authState.interface'

// Объявляем authFeature с `extraSelectors` как функцию
export const authFeature = createFeature<
  'auth',
  AuthStateInterface,
  {
    selectIsSubmitting: MemoizedSelector<Record<string, any>, boolean>
  }
>({
  name: 'auth',
  reducer: reducers,
  extraSelectors: ({selectAuthState}) => {
    const selectIsSubmitting = createSelector(
      selectAuthState,
      (state: AuthStateInterface) => state.isSubmitting,
    )

    return {
      selectIsSubmitting,
    }
  },
})

// Извлекаем selectIsSubmitting из authFeature
export const selectIsSubmitting = authFeature.selectIsSubmitting
