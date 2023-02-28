import styled from '@mui/system/styled'
import Stack from '@mui/material/Stack'
import { Text } from '../../theme/styles'
import Props from '../../types/props.type';
import Box, { BoxProps } from '@mui/material/Box';
import { TextThemeProps } from '../../types/style-types';
import { ColumnType } from '../../types/table-type';
import handleDate from '../../utils/handle-date';
import { dateOptions as options } from '../../utils/constants'
import handleValues from '../../utils/handle-cell'
import Skeleton from '@mui/material/Skeleton';
import { SxProps } from '@mui/system';
import { memo } from 'preact/compat';

type LabelProps = {
    label: unknown;
    icon: string;
}

interface StackDetailsProps<DetailsProps> extends Props {
    labels: LabelProps[];
    details: DetailsProps;
    columns: ColumnType;
    idxArr: Array<string>
    loading: boolean;
    handleLink?: (row: unknown) => void;
    n?: number;
}

const StackDetails = <DetailsProps,>({ labels, details, columns, idxArr, loading, handleLink, ...props }: StackDetailsProps<DetailsProps>) => {
    const { ifsx, dtsx, ...others } = props
  return !loading ? (
    <Stack direction="row" justifySelf="flex-start" m={3} spacing={4} {...others}>
        <InfoIcon {...ifsx as SxProps}>
            {labels.map(row => 
                <Text fsz={14} key={row.label} ff="Open Sans" fw={700} sx={{ '&::after': {
                    content: "':'",
                }}} >{row.label}</Text>
            )}
        </InfoIcon>
        <Details {...dtsx as SxProps}>
            {idxArr && details && idxArr?.map((idx: string) => {
                
                let rowIdx: unknown;
                const column = (columns[+idx] + '').split('-')
                if (column[1] === 'date') {
                    rowIdx = handleDate(details[column[0] as keyof typeof details] + '', options) 
                } else {
                    rowIdx = details[columns[+idx] as keyof typeof details]  
                }
                return typeof rowIdx === 'string' && rowIdx?.includes('https://') ? (
                    <Text 
                        colur="blue" fsz={14} key={idx} 
                        ff ="Open Sans" fw={400} 
                        style={{ textDecoration: 'underline', cursor:'pointer' }}
                        onClick={() => handleLink ? handleLink(rowIdx) : null}
                    >
                        View image
                    </Text>
                ) : <Text fsz={14} key={idx} ff ="Open Sans" fw={400}>{handleValues(rowIdx)}</Text>}
            )}
        </Details>
    </Stack>
  ) : 
  (<Stack direction="row" justifySelf="flex-start" m={3} spacing={4} {...others}>
        <InfoIcon>
            {[...Array(props?.n).keys()].map(row => 
                <Skeleton width={150} height={20} key={row} />
            )}
        </InfoIcon>
        <Details>
            {[...Array(props?.n).keys()].map(row => 
                <Skeleton width={200} height={20} key={row} />
            )}
        </Details>
    </Stack>)
}

StackDetails.defaultProps = {
    n: 10
}

const InfoIcon = styled(Box)<BoxProps>(
    ({ theme, ...props }: TextThemeProps) => `
    display: grid;
    grid-template-columns: max-content;
    row-gap: 15px;
`)

const Details = styled(Box)<BoxProps>(
    ({ theme, ...props }: TextThemeProps) => `
    display: grid;
    grid-template-columns: max-content;
    font-weight: 400;
    font-family: Poppins;
    row-gap: 15px;
    width: 265px;
    max-width: 265px;
    overflow-x: auto;
    overflow-y: hidden;
`)

export default memo(StackDetails)