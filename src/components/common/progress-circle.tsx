import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

type ProgressProps = Partial<CircularProgressProps>

const ProgressCircle = ({...props}) => {
  return (
    <CircularProgress 
      size={27} 
      color="inherit" 
      {...props} 
    />
  )
}

export default ProgressCircle