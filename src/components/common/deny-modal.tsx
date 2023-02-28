import Stack from '@mui/material/Stack'
import { TargetedEvent } from 'preact/compat';
import { Text, TextInput } from '../../theme/styles'
import ActionBtn from './custom-button'
import Select from 'react-select'
import FormList, { DenyModalOptions } from '../../types/deny-form-list';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import Company from 'src/types/company.type';

let company: Company;

interface DenyModalProps {
    handleDeny: (e: TargetedEvent<any, Event>) => Promise<void>;
    isLoading: boolean;
    addErrors: () => void;
    options: Array<DenyModalOptions>;
    formList: Array<FormList>;
}

const DenyModal = ({ handleDeny, addErrors, isLoading, formList, options }: DenyModalProps) => {
  return (
    <Stack spacing={2}>
        <Text>Set compliance errors </Text>
        <ActionBtn 
            onClick={addErrors} 
            btnname="Add Errors" 
            disabled={isLoading}
            sx={{ alignSelf: 'flex-end' }}
        />
        <TransitionGroup component={Stack}>
            {formList && formList.map((row, idx, arr) => {
                const {handleSelect, handleInput, handleDelete, handleDisabled } = row
                const rowName = arr[idx]?.name as keyof typeof company
                const selectedFields = arr[idx]?.selectedValue ?? []
                const textInput = arr[idx]?.inputValue  ?? {} as typeof company  
                
                const map = new Map(arr.map(item => [item.selectedValue ? item.selectedValue[0] : {}, item]));
                const rowOptions = options.filter(op => !map.has(op))                     
                return (
                <Collapse key={row.id}>
                    <Stack direction="row" spacing={3} alignItems="center" mb={3}>
                        <Select 
                            styles={{ container: (base: any) => ({ ...base, width: '60%' }) }}
                            value={selectedFields} 
                            name={rowName} 
                            options={rowOptions} 
                            onChange={handleSelect ? (e: any) => handleSelect(e, idx) : undefined} 
                            isClearable={false}
                            isMulti={false}
                            isSearchable
                            placeholder="Select error name"
                            isDisabled={isLoading}
                        />
                        <TextInput 
                            disabled={!selectedFields?.length || isLoading}
                            type="text" 
                            name={rowName} 
                            value={textInput[rowName]}
                            onChange={handleInput ? (e: any) => handleInput(e, row, idx) : undefined}
                            fullWidth
                            onClick={handleDisabled ? () => handleDisabled(row) : undefined}
                            placeholder="Add a description"
                            sx={{ "& .MuiInputBase-root": {height: 39} }}
                        />
                        <DeleteIcon 
                            fontSize='small' 
                            sx={{ color: 'red', justifySelf: 'flex-end' }} 
                            onClick={handleDelete && !isLoading ? 
                                () => handleDelete(row, idx) : 
                                (e: any) => e.preventDefault()} 
                        />
                    </Stack>
                </Collapse>)}
            )}
        </TransitionGroup>
        <ActionBtn 
            onClick={handleDeny} 
            btnname="Deny compliance" 
            isLoading={isLoading} 
            disabled={isLoading || !formList.length}
        />
    </Stack>
  )
}

export default DenyModal