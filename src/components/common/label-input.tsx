import { TextInput, Text } from '../../theme/styles'
import styled from '@mui/system/styled';
import { PropsWithChildren } from 'preact/compat';
import { TextFieldProps } from '@mui/material/TextField';
import { TextProps } from '../../types/style-types'

interface LabelInputProps extends PropsWithChildren {}

type LableInputType = LabelInputProps & TextFieldProps

const LabelInput = ({children, ...props}: LableInputType) => {
  return (
    <Label>
        <LabelText variant="caption">{children}</LabelText>
        <TextInput {...props} />
    </Label>
  )
}

const Label = styled('label')
    (({ theme }) => `    
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${theme.palette.background.body}
`)

const LabelText = styled(Text)<TextProps>
  (({ theme }) => `
  font-size: 12px;
  line-height: 1.4375em;
  font-weight: 500;
  font-family: ${theme?.typography.fontFamily};

  &::after {
    content: '*';
    color: red;
    font-size: 14px;
  }
`)

export default LabelInput