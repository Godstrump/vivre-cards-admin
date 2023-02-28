import { Pagination, Stack, StackProps, styled } from "@mui/material";
import PaginationProps from "../../types/pagination.type";

const Container = styled(Stack)<StackProps>(({ theme }) => ({
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    '& nav': {
        marginLeft: 'auto',
        marginRight: 20
    }
}));

const PaginationMod = ({ count, currentPage, handleChange, isLoading, isData, ...props }: PaginationProps) => {
    return !isLoading && isData ? (
        <Container spacing={2} mt={5} pb={2}>
            <Pagination
                count={count}
                page={currentPage}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
                color="primary"
                sx={{
                    "& button:not(.MuiPaginationItem-previousNext)": {
                        backgroundColor: "primary.main",
                        color: "#000",
                    },
                    "& .MuiPaginationItem-previousNext": {
                        backgroundColor: "background.body",
                        "& svg": {
                            color: "primary.main"
                        }
                    }
                }}
                {...props}
            />
        </Container>
    ) : <></>;
};

export default PaginationMod;
