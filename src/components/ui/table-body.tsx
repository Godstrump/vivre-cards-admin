import { useState } from 'preact/hooks';
import styled from '@mui/system/styled';
import TableBody from '@mui/material/TableBody';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { Tablecell } from '../../theme/styles';
import { TableBodyType } from '../../types/table-type';
import StatusBadge from './status-badge';
import Menu from '../common/menu'
import handleCell from '../../utils/handle-cell';

const Tablebody = <DataType,>({ data, columns, ...props }: TableBodyType<DataType>) => {
    const { menuData, handleNavigate } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableBody>
            {data.length && data.map((row: DataType, idx) => {
                const columnIdx = (key: number) => columns[key]
                const value = (key: number) => row[columnIdx(key) as keyof typeof row]
                const item = (key: number) => {
                    const indexKey = (columnIdx(key) + '').split('/')
                    if (indexKey.length === 1) {
                        return value(key)
                    }
                    const index0 = indexKey[0] as keyof typeof row
                    const index1 = indexKey[1] as keyof typeof row[typeof index0]
                    return row[index0][index1]
                }

                return (
                    <Tablerow
                        key={row[columns[0] as keyof typeof row]}
                        onClick={(e: any) => handleNavigate ? handleNavigate(e, item(0)) : null}
                    >
                        <Tablecell align="left" show={true}>
                            {idx + 1}
                        </Tablecell>
                        <Tablecell align="left" show={columnIdx(1)}>
                            {handleCell(item(1))}
                        </Tablecell>
                        <Tablecell align="left" show={columnIdx(2)}>
                            {handleCell(item(2))}
                        </Tablecell>
                        <Tablecell sx={{ textOverflow: 'ellipsis' }} align="left" show={columnIdx(3)}>
                            {handleCell(item(3))}
                        </Tablecell>
                        <Tablecell align="left" show={columnIdx(4)}>
                            {handleCell(item(4))}
                        </Tablecell>
                        <Tablecell align="left" show={columnIdx(5)}>
                            {handleCell(item(5))}
                        </Tablecell>
                        <Tablecell align="left" show={columnIdx(6)}>
                            {handleCell(item(6))}
                        </Tablecell>
                        <Tablecell align="left" show={columnIdx(7)}>
                            {handleCell(item(7))}
                        </Tablecell>
                        <Tablecell align="center" show={columnIdx(8)}>
                            <StatusBadge status={item(8)} isError={typeof item(7) === 'boolean' ? item(7) : false} />
                        </Tablecell>
                        <Tablecell align="right" show={menuData}>
                            <IconButton sx={{ padding: 0, '& svg': { color: '#000' } }} onClick={handleClick}><LinearScaleIcon /></IconButton>
                            <Menu open={open} handleClose={handleClose} anchorEl={anchorEl} data={menuData ?? []} id={item(0)} />
                        </Tablecell>
                    </Tablerow>
                )
            }
            )}
        </TableBody>
    )
}

const Tablerow = styled(TableRow)<TableRowProps>(
    ({ theme, ...props }) => `
    cursor: pointer; 
    &:last-child td, &:last-child th { 
        border: 0;
    } 
    &:hover { 
        background-color: #000;
        border-radius: 2px;
        & td {
             color: #FFF;
             font-weight: 500;
         } 

        & td svg {
            color: #FFF;
        }
    }
`)

export default Tablebody