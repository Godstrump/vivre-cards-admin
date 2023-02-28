import { useCallback } from 'preact/hooks';
import { TargetedEvent } from 'preact/compat';
import { Fragment } from 'preact/jsx-runtime';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CSSObject, Theme, useTheme } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import styled from '@mui/system/styled'
import { Wrapper, Text } from '../../theme/styles';
import BoxCard from '../../components/ui/stack-cards'
import { entering, leaving } from '../../theme/transitions';
import DataTable from '../../components/common/data-table';
import TemplateType from '../../types/template.type';

const RouteTemplate = <TemplateDataType,>({ statuses, tableHeaders, tableData, ...props }: TemplateType<TemplateDataType>) => {
    const theme = useTheme()
    const handleCount = (total: number, size: number) => {        
        return isNaN(total) ? 1 : Math.ceil(total / size);
    }

    const handlePage = useCallback(
        (event: TargetedEvent<any, Event>, pgn: number) => {
            event.preventDefault();
            if (props?.getCurrentPage) {
                props?.getCurrentPage(pgn)
            }
        },
        []
    );


    return (
        <Wrapper>
            <BoxCard>
                <Box width="70%">
                    <Text colur={["text", "primary"]} fw={600} fsz={25}>{props?.route}</Text>
                    <Stack mt={8} direction="row" spacing={2} >
                        {statuses.map(item =>
                            <Fragment key={item.tab}>
                                <StatusText total={item.total} onClick={() => props?.handleTab(item.tab)} sx={item.tab === props?.tab ? {
                                    ...active(theme, props?.tab)
                                } : {}} variant="caption">{item.status}</StatusText>
                            </Fragment>
                        )}
                    </Stack>
                </Box>
            </BoxCard>
            <BoxCard mt={1}>
                <DataTable 
                    headData={tableHeaders}
                    bodyData={tableData}
                    columns={props.columns}
                    loading={props.isFetching}
                    handleNavigate={props?.handleNavigate}
                    menuData={props.menuData}
                    //Pagination props
                    handleChange={handlePage}
                    isData={tableData?.length}
                    currentPage={props?.currentPage ?? 1}
                    isLoading={props.isFetching}
                    count={handleCount(props.totalPageSize, props.pageSize)}
                />
            </BoxCard>
        </Wrapper >
    );
};

const active = (theme: Theme, tab: string): CSSObject => ({
    ...entering(theme, tab, 'easeIn'),
    backgroundColor: '#000',
    color: '#FFF',
    borderRadius: '4px',

    '&::after': {
        backgroundColor: '#FFF',
        color: '#000'
    },

    ...leaving(theme, 'backgroundColor', 'easeOut')
});

const StatusText = styled(Typography)<TypographyProps>(({ theme, ...props }) => ({
    width: 'max-content',
    display: 'flex',
    alignItems: "center",
    gap: 12,

    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    padding: theme.spacing(.5, 1.2),

    '&::after': {
        content: `"${props?.total ?? 0}"`,
        padding: '1px 7px',
        height: 17,
        width: 'max-content',
        borderRadius: 4,
        backgroundColor: '#000',
        color: ' #FFF',
        fontSize: 10,
        textAlign: 'center',
    },
    '&:hover': {
        backgroundColor: '#000',
        color: '#FFF',
        borderRadius: 4,

        '&::after': {
            backgroundColor: '#FFF',
            color: '#000'
        }
    }
}))

export default RouteTemplate;
