import Stack from "@mui/material/Stack"
import Lottie from "lottie-react"
import Props from "../../types/props.type"
import EmptyLottie from '../../assets/lottie/empty.json'

interface EmptyProps extends Props {}

const Empty = ({ wdth, ...props }: EmptyProps) => {
  return (
    <Stack alignItems="center" justifyContent="center" {...props}>
        <Lottie style={{ width: wdth }} animationData={EmptyLottie} />
    </Stack>
  )
}

export default Empty