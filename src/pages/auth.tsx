import { useMemo, useRef, useState } from "preact/hooks"
import Box, { BoxProps } from "@mui/material/Box"
import Stack, { StackProps } from "@mui/material/Stack"
import styled from '@mui/system/styled'
import LabelInput from "../components/common/label-input"
import Vendgram from '../assets/img/logo.png'
import { Text } from '../theme/styles'
import InputAdornment, { InputAdornmentProps } from "@mui/material/InputAdornment"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Btn from '../components/common/custom-button'
import BtnProps from "../types/custom-button.type"
import { addLog } from "../redux/app-logs/app-log.reducer"
import { LOG_STATE } from "../utils/constants"
import { useAppDispatch } from "../app/hooks"
import { useLoginMutation } from "../redux/users/user-api.slice"
import { LoginBody } from "../types/login-data.type"
import { useNavigate } from "react-router-dom"
import { DASHBOARD } from "../utils/routes"

LOG_STATE.location = 'Auth'

const Auth = () => {
    const [mutate, { isLoading }] = useLoginMutation<{ mutate: LoginBody, isLoading: boolean }>()
    const [showPass, setShowPass] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const renderEye = useMemo(() => 
        showPass ? 
        <VisibilityOffIcon size={20} color="inherit" /> : 
        <VisibilityIcon size={20} color="inherit" />
    ,[showPass])
    
    const handleEye = () => setShowPass(prev => !prev)

    const handleSubmit = async () => {
        const email = emailRef.current?.value;
        const pin = passRef.current?.value
        if (email?.trim() && pin?.trim()) {
            const payload: any= await mutate({ 
                email: email,
                pin: pin
            })
            if (!payload?.data) {
                LOG_STATE.msg = payload?.error.message
                return dispatch(addLog(LOG_STATE))
            }
            navigate(DASHBOARD)
            return 
        }
        LOG_STATE.msg = 'Email and Password can not be empty'
        return dispatch(addLog(LOG_STATE))
    }

    return (
        <Container>
            <Stack alignItems="center" mb={3}>
                <img src={Vendgram} />
                <Text fsz={15} fw={700}>ADMIN</Text>
            </Stack>
            <LoginCard>
                <Form>
                    <Text mx="auto" fsz={20} fw={700} variant="h1">Log in to your account</Text>
                    <Stack mt={8} spacing={3}>
                        <LabelInput 
                            sx={{ width: 330 }} 
                            type="email" 
                            children="Company Email Address" 
                            required
                            inputRef={emailRef}
                        />
                        <LabelInput 
                            sx={{ width: 330 }} 
                            type={showPass ? "text" : "password"} 
                            children="Password" 
                            required
                            inputRef={passRef}
                            InputProps={{
                                endAdornment: (
                                    <InputAdorn 
                                        position="end" 
                                        onClick={handleEye}
                                    >
                                        {renderEye}
                                    </InputAdorn>
                                )
                            }}
                        />
                    </Stack>
                    <CustomBtn 
                        btnname="Log in to account" 
                        isLoading={isLoading} 
                        disabled={isLoading}
                        onClick={handleSubmit}
                    />
                </Form>
            </LoginCard>
        </Container>
    )
}

const Container = styled(Stack)<StackProps>
    (({ theme }) => `
    width: 100%;
    height: 100vh;
    background-color: ${theme.palette.primary[100]};

    justify-content: center;
    align-items: center;
`)

const LoginCard = styled(Box)<BoxProps>
    (({ theme }) => `
    background-color: ${theme.palette.primary.main};

    display: flex;
    justify-content: center;
    height: max-content;
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 20px;
`)

const Form = styled(Stack)<StackProps>
    (({ theme }) => `
    padding: 40px;
    margin: auto;
`)

const InputAdorn = styled(InputAdornment)<InputAdornmentProps>
    (({ theme }) => `
    color: ${theme.palette.background.body};
    cursor: pointer;
`)

const CustomBtn = styled(Btn)<BtnProps>
    (({ theme }) => `
    text-transform: none;
    width: 100%;
    font-size: 13px;
    margin-top: 50px;
    margin-bottom: 20px;
`)

export default Auth