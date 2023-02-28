import MenuEl from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TargetedEvent } from 'preact/compat';
import MenuProps from '../../types/menu.type';

const Menu = ({ anchorEl, open, handleClose, data, id }: MenuProps) => {
  return (
    <MenuEl
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {data && data.map((item) =>
        <MenuItem key={item.label} onClick={(e: TargetedEvent<any, Event>) => item.action(e, id)}>{item.label}</MenuItem>)
      }
    </MenuEl>
  )
}

export default Menu