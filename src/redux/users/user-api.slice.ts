import Company from "../../types/company.type";
import ApiResponse, { ErrorResponse, PayloadError } from "../../types/api-response.type";
import User, { TotalUsersType } from "../../types/user.type";
import Data from '../../types/data-response.type'
import { fetchingCompany, loginUser, logout, setCompanyData, setUserData, setUsers } from './user.reducer'
import { ApproveResponse, ApproveType } from "../../types/approve-type";
import { ADMIN_INFO, AUTH_TOKEN, LOG_STATE } from "../../utils/constants";
import { addLog } from "../app-logs/app-log.reducer";
import DenyResponse, { DenyType } from "../../types/deny-type";
import LoginData, { LoginBody } from "../../types/login-data.type";
import { apiSlice } from "../../app/api-slice";
import ComplianceType, { MetaComplianceBody } from "../../types/meta-compliance-data.type";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsers: builder.query<Data<User>, string | void>({
            query: () => "/admin/view_users/?pgs=15&pgn=1",
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                LOG_STATE.location = 'Fetch users'
                try {
                  const { data } = await queryFulfilled
                  // `onSuccess` side-effect
                  dispatch(setUsers(data.data))                 
                } catch (err: any) {
                  // `onError` side-effect
                  LOG_STATE.msg = err?.message
                  dispatch(addLog(LOG_STATE))
                }
            },
            transformResponse: (
                response: ApiResponse<Data<User>>
            ) => {                                                
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                console.log(response);
                return response.data
            },
            providesTags: [{ type: 'Users' }],
        }),
        fetchUser: builder.query<User, string | void>({
            query: (id) => `/admin/view_user/${id}`,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {              
                // `onStart` side-effect
                LOG_STATE.location = 'Fetch user'
                try {
                  const { data } = await queryFulfilled
                  // `onSuccess` side-effect                  
                  dispatch(setUserData(data))
                } catch (err: any) {
                  // `onError` side-effect
                  LOG_STATE.msg = err?.message
                  dispatch(addLog(LOG_STATE))
                }
            },
            transformResponse: (response: ApiResponse<User>) => {
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            providesTags: [{ type: 'Users', id: 'User' }]
        }),
        fetchCompany: builder.query<Company, string | void>({
            query: (id) => `/admin/get-user-company/${id}`,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                LOG_STATE.location = 'Fetch company'
                dispatch(fetchingCompany())
                try {
                  const { data } = await queryFulfilled
                  // `onSuccess` side-effect                  
                  dispatch(setCompanyData(data))
                } catch (err: any) {
                  // `onError` side-effect
                  LOG_STATE.msg = err?.message
                  dispatch(addLog(LOG_STATE))
                }
            },
            transformResponse: (response: ApiResponse<Company>) => {
                return response.data
            },
            providesTags: [{ type: 'Users', id: "Company" }],
        }),
        approveCompliance: builder.mutation<ApproveResponse, ApproveType>({
            query: ({ userId, email }) => {
                console.log(email);
                
                return {
                url: `/admin/approve-compliance/${userId}`,
                method: 'POST',
                body: {email},
              }},
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                LOG_STATE.location = 'Approve compliance'
                try {
                  const { data } = await queryFulfilled
                  // `onSuccess` side-effect
                  console.log(data)                
                  LOG_STATE.msg = "Compliance approved successfully"
                  LOG_STATE.variant = 'success'
                  dispatch(addLog(LOG_STATE))
                } catch (err: any) {
                  // `onError` side-effect
                  LOG_STATE.msg = err?.message
                  dispatch(addLog(LOG_STATE))
                }
            },
            transformResponse: (
                response: ApiResponse<ApproveResponse>
            ) => {
                console.log(response)             
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                console.log(response);
                return response.data
            },
            invalidatesTags: [{type: "Users", id: 'User'}]            
        }),
        createCardAccount: builder.mutation<ApproveResponse, ApproveType>({
          query: ({ userId, email }) => {              
              return {
              url: `/admin/create-card-user/${userId}`,
              method: 'POST',
              body: {email},
            }},
          async onQueryStarted(id, { dispatch, queryFulfilled }) {
              // `onStart` side-effect
              LOG_STATE.location = 'Approve compliance'
              try {
                const { data } = await queryFulfilled
                // `onSuccess` side-effect
                console.log(data)                
                LOG_STATE.msg = "Card user created successfully"
                LOG_STATE.variant = 'success'
                dispatch(addLog(LOG_STATE))
              } catch (err: any) {
                // `onError` side-effect
                LOG_STATE.msg = err?.message
                dispatch(addLog(LOG_STATE))
              }
          },
          transformResponse: (
              response: ApiResponse<ApproveResponse>
          ) => {
              console.log(response)             
              return response.data
          },
          transformErrorResponse: (response: ErrorResponse) => {
              console.log(response);
              return response.data
          },
          invalidatesTags: [{type: "Users", id: 'User'}]            
        }),
        createProvidusAcct: builder.mutation<ApproveResponse, Partial<Record<'userId', string>>>({
          query: ({ userId }) => {
              return {
              url: `/admin/create-providus-acct/${userId}`,
              method: 'POST',
            }},
          async onQueryStarted(id, { dispatch, queryFulfilled }) {
              // `onStart` side-effect
              LOG_STATE.location = 'Approve compliance'
              try {
                const { data } = await queryFulfilled
                // `onSuccess` side-effect
                console.log(data)                
                LOG_STATE.msg = "Providus account successfully"
                LOG_STATE.variant = 'success'
                dispatch(addLog(LOG_STATE))
              } catch (err: any) {
                // `onError` side-effect
                LOG_STATE.msg = err?.message
                dispatch(addLog(LOG_STATE))
              }
          },
          transformResponse: (
              response: ApiResponse<ApproveResponse>
          ) => {
              console.log(response)             
              return response.data
          },
          transformErrorResponse: (response: ErrorResponse) => {
              console.log(response);
              return response.data
          },
          invalidatesTags: [{type: "Users", id: 'User'}]            
        }),
        activateUser: builder.mutation<ApproveResponse, Record<'userId'|'status', string>>({
          query: ({ userId, status }) => {              
              return {
              url: `/admin/update-brex-user/${userId}`,
              method: 'POST',
              body: {status},
            }},
          async onQueryStarted(id, { dispatch, queryFulfilled }) {
              // `onStart` side-effect
              LOG_STATE.location = 'Approve compliance'
              try {
                const { data } = await queryFulfilled
                // `onSuccess` side-effect
                console.log(data)                
                LOG_STATE.msg = "User activated successfully"
                LOG_STATE.variant = 'success'
                dispatch(addLog(LOG_STATE))
              } catch (err: any) {
                // `onError` side-effect
                LOG_STATE.msg = err?.message
                dispatch(addLog(LOG_STATE))
              }
          },
          transformResponse: (
              response: ApiResponse<ApproveResponse>
          ) => {
              console.log(response)             
              return response.data
          },
          transformErrorResponse: (response: ErrorResponse) => {
              console.log(response);
              return response.data
          },
          invalidatesTags: [{type: "Users", id: 'User'}]            
        }),
        denyCompliance: builder.mutation<DenyResponse, DenyType>({
            query: ({ userId, ...body }) => ({
                url: `/admin/set-compliance-errors/${userId}`,
                method: 'PATCH',
                body: body,
              }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                LOG_STATE.location = 'Approve compliance'
                try {
                  const { data } = await queryFulfilled
                  // `onSuccess` side-effect                  
                  LOG_STATE.msg = "Compliance approved successfully"
                  LOG_STATE.variant = 'success'
                  dispatch(addLog(LOG_STATE))
                } catch (err: any) {
                  // `onError` side-effect
                  LOG_STATE.msg = err?.message
                  dispatch(addLog(LOG_STATE))
                }
            },
            transformResponse: (
                response: ApiResponse<DenyResponse>
            ) => {
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                console.log(response);
                return response.data
            }
        }),
        login: builder.mutation<LoginData, LoginBody>({
            query: (body) => ({
                url: `/admin/login`,
                method: 'POST',
                body: body,
              }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                LOG_STATE.location = 'Login'
                LOG_STATE.msg = "Login successfully"
                try {
                  const { data } = await queryFulfilled
                  // `onSuccess` side-effect
                  const stringData = JSON.stringify(data)
                  localStorage.setItem(AUTH_TOKEN, stringData);             
                  dispatch(loginUser(data))               
                  LOG_STATE.variant = 'success'
                  dispatch(addLog(LOG_STATE))
                } catch (err: any) {
                  // `onError` side-effect
                  LOG_STATE.msg = err?.message
                  dispatch(addLog(LOG_STATE))
                }
            },
            transformResponse: (
                response: ApiResponse<LoginData>
            ) => {
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                console.log(response);
                return response.data
            }
        }),
        logout: builder.mutation<null, void>({
          query: () => ({
              url: `/admin/logout`,
              method: 'POST',
            }),
          async onQueryStarted(id, { dispatch, queryFulfilled }) {
              // `onStart` side-effect
              LOG_STATE.location = 'Login'
              LOG_STATE.msg = "Logout successfully"
              try {
                const { data } = await queryFulfilled
                console.log('heyy');
                
                // `onSuccess` side-effect
                const isHeader = localStorage.getItem(AUTH_TOKEN);  
                if (isHeader) {
                  localStorage.removeItem(AUTH_TOKEN)
                  dispatch(logout())
                }
                LOG_STATE.variant = 'success'
              } catch (err: any) {
                // `onError` side-effect
                LOG_STATE.msg = err?.message
                dispatch(addLog(LOG_STATE))
              }
          },
          transformResponse: (
              response: ApiResponse<null>
          ) => {
              return response.data
          },
          transformErrorResponse: (response: ErrorResponse) => {
              console.log(response);
              return response.data
          }
        }),
        fetchCompliance: builder.mutation<ComplianceType, MetaComplianceBody>({
            query: ({ registrationNumber }) => ({
                url: `/admin/get-compliance-data`,
                method: 'POST',
                body: {registrationNumber},
              }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                LOG_STATE.location = 'Fetch compliance'
                try {
                  const { data } = await queryFulfilled
                  // `onSuccess` side-effect                  
                } catch (err: any) {
                  // `onError` side-effect
                  LOG_STATE.msg = err?.message
                  dispatch(addLog(LOG_STATE))
                }
            },
            transformResponse: (response: ApiResponse<ComplianceType>) => {
                return response.data
            },
        }),
        approveWithdrawal: builder.mutation<null, Record<'withdrawalId', string>>({
          query: ({ withdrawalId }) => {              
              return {
              url: `/admin/approve-withdrawal/${withdrawalId}`,
              method: 'POST',
            }},
          async onQueryStarted(id, { dispatch, queryFulfilled }) {
              // `onStart` side-effect
              LOG_STATE.location = 'Approve compliance'
              try {
                const { data } = await queryFulfilled
                // `onSuccess` side-effect
                console.log(data)                
                LOG_STATE.msg = "Withdrawal approved successfully"
                LOG_STATE.variant = 'success'
                dispatch(addLog(LOG_STATE))
              } catch (err: any) {
                // `onError` side-effect
                LOG_STATE.msg = err?.message
                dispatch(addLog(LOG_STATE))
              }
          },
          transformResponse: (
              response: ApiResponse<null>
          ) => {
              console.log(response)             
              return response.data
          },
          transformErrorResponse: (response: ErrorResponse) => {
              console.log(response);
              return response.data
          },
          invalidatesTags: [{type: "Txns", id: 'Withdrawals'}]            
        }),
        fetchTotalUsers: builder.query<TotalUsersType, string | void>({
          query: () => `/admin/get-total-users`,
          transformResponse: (
              response: ApiResponse<TotalUsersType>
          ) => {                                                
              return response.data
          },
          transformErrorResponse: (response: ErrorResponse) => {
              return response.data
          },
          providesTags: [{ type: 'Users', id: 'Total' }]
      }),
    }),
});

export const {
    useFetchUsersQuery,
    useFetchUserQuery,
    useFetchCompanyQuery,
    useApproveComplianceMutation,
    useDenyComplianceMutation,
    useLoginMutation,
    useLogoutMutation,
    useActivateUserMutation,
    useCreateCardAccountMutation,
    useCreateProvidusAcctMutation,
    useApproveWithdrawalMutation,
    useFetchTotalUsersQuery
} = usersApiSlice;
