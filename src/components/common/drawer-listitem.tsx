import { useCallback } from 'preact/hooks'
import { useLocation } from "react-router-dom"
import ListItem, { ListItemProps } from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { CSSObject, Theme } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import styled from "@mui/system/styled"
import { LinkProps } from "../../types/drawer-link"


type ItemProps = {
    navigate: (url: string) => void,
    link: LinkProps,
    open: boolean
}

const DrawerListItem = ({ navigate, link, open, ...props }: ItemProps) => {
    const { pathname } = useLocation()

    const handleActive = useCallback((url: string) => {  
        const path = pathname?.split('/')[2]  
        const listUrl = url?.split('/')[2]
        if (path === listUrl) {
            return {
                ...active()
            }
        }
        return {}
    }, [pathname])

    return (
        <Tooltip title={!open ? link.text : ''} placement="right">
            <ListItemEl disablePadding onClick={() => navigate(link.url)} {...props} sx={handleActive(link.url)}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: '#FFF'
                        }}
                    >
                        {link.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={link.text}
                        sx={{
                            opacity: open ? 1 : 0,
                            fontWeight: 400,
                            color: '#FFF',
                            fontFamily: 'Poppins'
                        }} />
                </ListItemButton>
            </ListItemEl>
        </Tooltip>
    )
}

const ListItemEl = styled(ListItem)<ListItemProps>(({ theme }) => `
    display: block;
    width: 100%;
    padding-right: 10px;
    &:hover {
        background-color: #545353;
    }
`)

const active = (): CSSObject => ({
    backgroundColor: '#545353',
    borderRight: '7px solid #FFF'
});

export default DrawerListItem