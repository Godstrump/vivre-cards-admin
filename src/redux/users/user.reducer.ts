import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/user.type";
import Company from '../../types/company.type'
import LoginData from "../../types/login-data.type";
import AdminUser from "../../types/admin-user.type";
import { AUTH_TOKEN } from "../../utils/constants";

export const logout = createAction('logout')

interface InitialStateProps {
    value: number;
    drawer: boolean;
    company: Company;
    fetchingCompany: boolean;
    users: Array<User>
    userInView: User;
    isAuth: boolean;
    token: string;
    user: AdminUser;
}

const initialState: InitialStateProps = {
    value: 0,
    drawer: true,
    company: {},
    fetchingCompany: false,
    users: [] as Partial<User[]>,
    userInView: {},
    isAuth: false,
    token: '',
    user: {} as AdminUser
} as InitialStateProps

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<LoginData>) {
            if (action.payload.token) {
                state.isAuth = true;
                state.token = action.payload.token
                state.user = action.payload.user
            }
        },
        toggleDrawer: (state) => {
            state.drawer = !state.drawer
        },
        fetchingCompany: (state) => {
            state.fetchingCompany = true
        },
        setCompanyData: (state, action: PayloadAction<Company>) => {
            state.company = action.payload;
            state.fetchingCompany = false
        },
        setUserData: (state, action: PayloadAction<User>) => {
            state.userInView = action.payload
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            localStorage.removeItem(AUTH_TOKEN)
            return initialState
        })
    }
})

export const { 
    loginUser, 
    toggleDrawer, 
    setCompanyData, 
    fetchingCompany, 
    setUserData,
    setUsers,
 } = userSlice.actions;
export default userSlice.reducer