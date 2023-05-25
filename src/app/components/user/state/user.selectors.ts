// Homework
import { User } from '../user';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';


// Selector functions
const getBookSubscriptionFeatureState = createFeatureSelector<UserState>('users');

export const getCurentUser = createSelector(
  getBookSubscriptionFeatureState,
  state => state.currentUser
);

export const getMaskUserName = createSelector(
  getBookSubscriptionFeatureState,
  state => state.maskUserName
);
