import { useCallback, useMemo, useState } from 'preact/hooks';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled'
import { DRAWER_WIDTH } from '../../utils/constants';
import { entering, leaving } from '../../theme/transitions'
import Stack from '@mui/material/Stack'
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserData } from '../../redux/users/user.selectors';
import { logout } from '../../redux/users/user.reducer';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from './menu';
import Avatar from './avatar';
import { useLogoutMutation } from '../../redux/users/user-api.slice';
import { apiSlice } from '../../app/api-slice';


const Appbar = ({ open }: { open: boolean }) => {
  const userData = useAppSelector(selectUserData)
  const dispatch = useAppDispatch()
  const [mutate, { isLoading }] = useLogoutMutation<{ mutate: void, isLoading: boolean }>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const expand = Boolean(anchorEl);

  const handleExpand = useCallback((event:any) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget)
      return
    }
    setAnchorEl(null)
  }, [anchorEl])

  const renderExpandIcon = useMemo(() => 
    anchorEl ? <ExpandLessIcon color="inherit" /> : 
    <ExpandMoreIcon color="inherit" />
  , [anchorEl])

  const handleLogout = async () => {
    dispatch(logout())
    dispatch(apiSlice.util.resetApiState())
    // await mutate()
    setAnchorEl(null)
  }

  const menuData = useMemo(() =>[
    { label: 'Logout', action: handleLogout },
], [])  

  return (
    <AppBar position="fixed" open={open}>
      <Bar>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar profile={userData.email} />
          <Typography variant="h6" noWrap component="div" color="text.primary">
            {userData.email}
          </Typography>
          <ExpandIcon onClick={handleExpand}>
            {renderExpandIcon}
          </ExpandIcon>
          <Menu open={expand} handleClose={handleExpand} anchorEl={anchorEl} data={menuData} id={null} />
        </Stack>
      </Bar>
    </AppBar>
  )
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,
  backgroundColor: theme.palette.primary.main,
  height: theme.spacing(8),

  '& MuiToolbar-root': {
    backgroundColor: theme.palette.primary.main,
  },
  ...(open && {
    ...entering(theme, ['width', 'margin']),
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
  }),
  ...leaving(theme, ['width', 'margin']),
}));

const Bar = styled(Toolbar)<ToolbarProps>
  (({ theme }) => `
  display: flex;
  flex-direction: row-reverse;
`)

const ExpandIcon = styled(IconButton, {
  shouldForwardProp: (prop: string) => prop !== 'expand',
})<IconButtonProps>(({ theme, expand }) => ({
  color: "#000",
  ...(expand && {
    ...entering(theme, 'transform'),
  }),
  ...leaving(theme, 'transform'),
}))

export default Appbar