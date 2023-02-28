import ApiResponse from "./api-response.type";

interface UseQueryType<Data> {
    data: Data;
    isFetching: boolean;
    error: ApiResponse<null>;
    refetch: () => void;
}

export default UseQueryType