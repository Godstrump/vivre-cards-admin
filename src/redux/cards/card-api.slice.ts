import CardTxnType from "src/types/card-txns.type";
import { apiSlice } from "../../app/api-slice";
import ApiResponse, { ErrorResponse } from "../../types/api-response.type";
import Card from "../../types/card.type";
import DataResponse from "../../types/data-response.type";


export const cardsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchCards: builder.query<Card[], string | void>({
            query: (id) => `/admin/get-user-cards/${id}`,
            transformResponse: (
                response: ApiResponse<Card[]>
            ) => {                                                
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            }
        }),
        fetchAllCards: builder.query<DataResponse<Card>, string | void>({
            query: () => "/admin/get-cards/?pgs=15&pgn=1",
            transformResponse: (response: ApiResponse<DataResponse<Card>>) => {
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            }
        }),
        fetchCard: builder.query<DataResponse<Card>, string | void>({
            query: (id) => `/admin/get-card-details/${id}`,
            transformResponse: (response: ApiResponse<DataResponse<Card>>) => {
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            }
        }),
        fetchCardTxns: builder.query<DataResponse<CardTxnType>, string | void>({
            query: (id) => `/admin/get-card-txns/${id}`,
            transformResponse: (response: ApiResponse<DataResponse<CardTxnType>>) => {
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            providesTags: [{ type: 'Cards', id: 'Txns' }]
        }),
        fetchAllCardTxns: builder.query<DataResponse<CardTxnType>, Record<'pgs'|'pgn', number>>({
            query: ({ pgs, pgn }) => `/admin/get-all-card-txns/?pgs=${pgs}&pgn=${pgn}`,
            transformResponse: (response: ApiResponse<DataResponse<CardTxnType>>) => {
                return response.data
            },
            transformErrorResponse: (response: ErrorResponse) => {
                return response.data
            },
            providesTags: [{ type: 'Cards', id: 'AllTxns' }]
        }),
    }),
});

export const {
    useFetchCardsQuery,
    useFetchAllCardsQuery,
    useFetchCardQuery,
    useFetchCardTxnsQuery,
    useFetchAllCardTxnsQuery
} = cardsApiSlice;
