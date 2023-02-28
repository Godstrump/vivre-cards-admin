import { Fragment, memo } from 'preact/compat';
import { useNavigate } from 'react-router-dom'
import styled from '@mui/system/styled';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UsersIcon from '@mui/icons-material/Group';
import CardsIcon from '@mui/icons-material/Style';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CssBaseline from '@mui/material/CssBaseline';
import PaidIcon from '@mui/icons-material/Paid';
import AddCardIcon from '@mui/icons-material/AddCard';

import AppBar from './drawer-bar'
import DrawerHeader from './drawer-header';
import DrawerList from './drawer-list';
import { DASHBOARD, USERS, CARDS, TRANSACTIONS, WITHDRAWALS, DEPOSITS } from '../../utils/routes';
import { entering, leaving, openedMixin, closedMixin } from '../../theme/transitions'
import { DRAWER_WIDTH } from '../../utils/constants'
import Props from '../../types/props.type';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDrawer } from '../../redux/users/user.selectors';
import { toggleDrawer as toggle } from '../../redux/users/user.reducer'

const LINKS = [
  { url: DASHBOARD, text: "Dashboard", icon: <DashboardIcon /> },
  { url: USERS, text: "Users", icon: <UsersIcon /> },
  { url: CARDS, text: "Cards", icon: <CardsIcon /> },
  {
    url: WITHDRAWALS,
    text: "Withdrawals",
    icon: <PaidIcon />,
  },
  {
    url: DEPOSITS,
    text: "Deposits",
    icon: <AddCardIcon />,
  },
  {
    url: TRANSACTIONS,
    text: "Transactions",
    icon: <ReceiptIcon />,
  },
];

const AppDrawer = (props: Props) => {
  const open = useAppSelector(selectDrawer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleNavigate = (url: string) => {
    navigate(url)
  }

  const toggleDrawer = () => {
    dispatch(toggle())
  };

  return (
    <Fragment>
      <CssBaseline />
      <DrawerWrapper>
        <AppBar open={open} />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader toggle={toggleDrawer} open={open} />
          <DrawerList open={open} links={LINKS} navigate={handleNavigate} />
        </Drawer>
        <DrawerContent component="main" open={open}>
          {props.children}
        </DrawerContent>
      </DrawerWrapper>
    </Fragment>
  );
}

const DrawerWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.body,
  width: '100vw',
  height: '100vh',
  overflowX: 'hidden'
}))

const Drawer = styled(MuiDrawer, 
  { shouldForwardProp: (prop: string) => prop !== 'open' })
  (({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiPaper-root': {
      backgroundColor: "#000",

    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerContent = styled(Box, { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open }) => ({
    marginTop: theme.spacing(18),
    overflowX: 'hidden',
    backgroundColor: '#f5f5f5',
    paddingRight: 62,
    ...(open && {
      ...entering(theme, ['width', 'margin']),
      marginLeft: `calc(${DRAWER_WIDTH}px + ${theme.spacing(4)})`,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
    }),
    ...(!open && {
      ...leaving(theme, ['width', 'margin']),
      marginLeft: theme.spacing(10),
      width: `calc(100% - ${theme.spacing(11)}) !important`,
    }),
}))

export default memo(AppDrawer)
