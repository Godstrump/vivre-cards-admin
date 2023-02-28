import List from '@mui/material/List';
import { LinkProps } from '../../types/drawer-link';
import DrawerListItem from './drawer-listitem';

type DrawerListProps = {
    links: LinkProps[],
    open: boolean,
    navigate: (link: string) => void
}

const DrawerList = ({ links, open, navigate }: DrawerListProps) => {
    return (
        <List sx={{ mt: 4 }}>
            {links.map((link) => (
                <DrawerListItem key={link.text} navigate={navigate} open={open} link={link} />
            ))}
        </List>
    )
}

export default DrawerList