import { createSelector } from "reselect";
import type { RootState } from "../../app/store";

export const selectUser = (state: RootState) => state.users;

export const selectDrawer = createSelector(
    [selectUser], 
    (user) => user.drawer
)

export const selectCompanyData = createSelector(
    [selectUser],
    (user) => user?.company
)

export const selectFetchingCompany = createSelector(
    [selectUser],
    (user) => user.fetchingCompany
)

export const selectUserDetails = createSelector(
    [selectUser],
    (user) => user.userInView
)

export const selectIsAuth = createSelector(
    [selectUser],
    (user) => user.isAuth
)

export const selectUserData = createSelector(
    [selectUser],
    (state) => state.user
)