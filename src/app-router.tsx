import { lazy } from 'preact/compat';
import { Routes, Route } from 'react-router-dom';
import { DASHBOARD, USERS, CARDS, VIEW_COMPLIANCE, LOGIN, WITHDRAWALS, DEPOSITS, TRANSACTIONS } from './utils/routes'
import Dashboard from './pages';
import Login from './pages/auth'

const Home = lazy(() => import('./pages/home'))
const Users = lazy(() => import('./pages/users'))
const UserDetails = lazy(() => import('./pages/user-details'))
const Cards = lazy(() => import('./pages/cards'))
const CardDetails = lazy(() => import('./pages/card-details'))
const ViewCompliance = lazy(() => import('./pages/view-compliance'))
const IsAuth = lazy(() => import('./components/common/is-auth'))
const Withdrawals = lazy(() => import('./pages/withdrawals'))
const Deposits = lazy(() => import('./pages/deposits'))
const Transactions = lazy(() => import('./pages/transactions'))

const AppRouter = () => (
    <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={DASHBOARD} element={<IsAuth><Dashboard /></IsAuth>}>
            <Route index element={<Home />} />
            <Route path={USERS} element={<Users />} />
            <Route path={`${USERS}/:userId`} element={<UserDetails />}>
                <Route index path={`${VIEW_COMPLIANCE}/:companyId`} element={<ViewCompliance />} />
            </Route>
            <Route path={CARDS} element={<Cards />}>
                <Route index path={`${CARDS}/:id`} element={<CardDetails />} />
            </Route>
            <Route path={WITHDRAWALS} element={<Withdrawals />} />
            <Route path={DEPOSITS} element={<Deposits />} />
            <Route path={TRANSACTIONS} element={<Transactions />} />
        </Route>
    </Routes>
)

export default AppRouter