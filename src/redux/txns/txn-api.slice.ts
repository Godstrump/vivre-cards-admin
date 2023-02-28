import RateType from "src/types/rate.type";
import TxnType, { TotalTxnDeposit } from "src/types/txn.type";
import { LOG_STATE } from "../../utils/constants";
import { apiSlice } from "../../app/api-slice";
import ApiResponse, { ErrorResponse } from "../../types/api-response.type";
import { addLog } from "../app-logs/app-log.reducer";
import { CardsTotalSpent } from "../../types/card-txns.type";


export const txnsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchWithdrawals: builder.query<TxnType[], number | void>({
            query: (pgn) => `/admin/get-all-withdrawals/?pgs=15&pgn=${pgn}`,
            transformResponse: (
                response: ApiResponse<TxnType[]>
            ) => {                                                
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            providesTags: [{ type: 'Txns', id: "Withdrawals" }],
        }),
        fetchDeposits: builder.query<TxnType[], number | void>({
            query: (pgn) => `/admin/get-all-deposits/?pgs=15&pgn=${pgn}`,
            transformResponse: (
                response: ApiResponse<TxnType[]>
            ) => {                                                
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            providesTags: [{ type: 'Txns', id: 'Deposits' }]
        }),
        fetchRate: builder.query<RateType, string | void>({
            query: () => `/admin/get-usd-rate`,
            transformResponse: (
                response: ApiResponse<RateType>
            ) => {                                                
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            providesTags: [{ type: 'Txns', id: 'Rate' }]
        }),
        saveRate: builder.mutation<RateType, Record<'fee'|'charge'|'rate', number>>({
            query: ({...body}) => ({
                url: `/admin/set-rate/USD`,
                method: 'POST',
                body: body
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                LOG_STATE.location = 'Approve compliance'
                try {
                  const { data } = await queryFulfilled
                  // `onSuccess` side-effect            
                  LOG_STATE.msg = "Rate set successfully"
                  LOG_STATE.variant = 'success'
                  dispatch(addLog(LOG_STATE))
                } catch (err: any) {
                  // `onError` side-effect
                  LOG_STATE.msg = err?.message
                  dispatch(addLog(LOG_STATE))
                }
            },
            transformResponse: (
                response: ApiResponse<RateType>
            ) => {                                                
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            invalidatesTags: [{ type: 'Txns', id: 'Rate' }]
        }),
        fetchTotalSpent: builder.query<CardsTotalSpent, string | void>({
            query: () => `/admin/get-total-card-spent`,
            transformResponse: (
                response: ApiResponse<CardsTotalSpent>
            ) => {                                                
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            providesTags: [{ type: 'Cards', id: 'Txns' }]
        }),
        fetchTotalDeposit: builder.query<TotalTxnDeposit, string | void>({
            query: () => `/admin/get-total-deposits`,
            transformResponse: (
                response: ApiResponse<TotalTxnDeposit>
            ) => {                                                
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            providesTags: [{ type: 'Txns', id: 'Deposit' }]
        }),
    }),
});

export const {
    useFetchWithdrawalsQuery,
    useFetchDepositsQuery,
    useFetchRateQuery,
    useSaveRateMutation,
    useFetchTotalSpentQuery,
    useFetchTotalDepositQuery
} = txnsApiSlice;
