import Stack from '@mui/material/Stack'
import { Ref, TargetedEvent } from 'preact/compat';
import User from '../../types/user.type';
import { Text, TextInput } from '../../theme/styles'
import ActionBtn from './custom-button'

type FnProps = {
  handleBrexAcct: (e: TargetedEvent<any, Event>) => Promise<void>;
  handleProvidusAcct: (e: TargetedEvent<any, Event>) => Promise<void>;
  handleUpdate: (e: TargetedEvent<any, Event>) => Promise<void>;
}

interface ApproveModalProps extends FnProps {
  inputRef: Ref<HTMLInputElement>;
  user: User;
  isLoading: Array<boolean>
}

const ApproveModal = ({ inputRef, isLoading, user, ...props }: ApproveModalProps) => {
  return (
    <Stack spacing={2}>
        <Text>Enter the Vendgram Email</Text>
        <TextInput disabled={!!user?.brexId} type="email" variant="outlined" inputRef={inputRef} />
        <Stack direction="row" spacing={2}>
          <ActionBtn 
              onClick={props.handleBrexAcct} 
              disabled={!!user?.brexId}
              btnname="Creater Brex user" 
              isLoading={isLoading[0]} 
          />
          <ActionBtn 
              onClick={props.handleProvidusAcct} 
              disabled={!!user?.account_number}
              btnname="Create Providus Acct" 
              isLoading={isLoading[1]} 
          />
          <ActionBtn 
              onClick={props.handleUpdate} 
              // disabled={!!user?.account_number}
              btnname="Approve User" 
              isLoading={isLoading[2]}
          />
        </Stack>
    </Stack>
  )
}

export default ApproveModal