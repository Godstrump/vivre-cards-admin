import AdminUser from "./admin-user.type";

export type LoginBody = {
    email: string;
    pin: string;
}

interface LoginData {
    user: AdminUser;
    token: string;
}

export default LoginData