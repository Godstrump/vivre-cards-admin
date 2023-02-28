import { PropsWithChildren } from "preact/compat"
import { selectIsAuth } from "../../redux/users/user.selectors"
import { useAppSelector } from "../../app/hooks"
import { Navigate, useLocation } from "react-router-dom"
import { LOGIN } from "../../utils/routes"


const IsAuth = (props: PropsWithChildren) => {
    const location = useLocation
    const isAuth = useAppSelector(selectIsAuth)
    return isAuth ? <>{props.children}</> : <Navigate to={LOGIN} state={{ from: location }} />
}

export default IsAuth