type DataResponse<DataType> = {
    data: DataType[];
    pageSize: number;
    totalPageSize: number;
}

export default DataResponse
