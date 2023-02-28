import { TargetedEvent } from "preact/compat";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "preact/hooks";
import { useNavigate, useParams } from "react-router-dom";
import CompareIcon from '@mui/icons-material/CompareArrows';
import styled from "@mui/system/styled";
import Stack from "@mui/material/Stack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCompanyData, selectDrawer, selectFetchingCompany, selectUserDetails } from "../redux/users/user.selectors";
import Portal from "../components/common/portal"
import BoxCard from '../components/ui/stack-cards'
import { entering, leaving } from "../theme/transitions";
import { companyColumns, DRAWER_WIDTH, companyLabels, LOG_STATE } from "../utils/constants";
import { USERS } from "../utils/routes";
import StackDetails from "../components/common/stack-details";
import { Text, TextInput } from '../theme/styles'
import Modal from "../components/common/modal";
import ModalRefObject from "../types/model-ref-object";
import { useActivateUserMutation, useApproveComplianceMutation, useCreateCardAccountMutation, useCreateProvidusAcctMutation, useDenyComplianceMutation } from "../redux/users/user-api.slice";
import { ApproveType } from "../types/approve-type";
import ActionBtn from '../components/common/custom-button'
import { addLog } from "../redux/app-logs/app-log.reducer";
import ApproveModal from "../components/common/approve-modal";
import DenyFormList, { DenyModalOptions } from "../types/deny-form-list";
import Company from "../types/company.type";
import { DenyType } from "../types/deny-type";
import DenyModal from "../components/common/deny-modal";
import formatSelectLabel from "../utils/format-select-label";
import ImageModal from "../components/common/image-modal";

let company: Company;
LOG_STATE.location = 'View compliance'

const options: Array<DenyModalOptions> = Object.values(companyColumns).map(item => { 
  return {value: item, label: formatSelectLabel(item) }
}).filter(option => option.value !== 'created_at_date')
const companyIdxArr = Object.keys(companyColumns)

const INITIAL_STATE = { 
  formList: [] as Array<DenyFormList>,
};
type StateType = typeof INITIAL_STATE
type ActionType = {
  type: 'add' | 'remove' | 'clear' | 'update';
  payload: DenyFormList
}

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'add':
      return { 
        ...state, 
        formList: [...state.formList, {...action.payload, id: action.payload.id + state?.formList.length} ]
      };
    case 'remove':
      return { 
        ...state, 
        formList: state.formList.filter(item => item.id !== action.payload.id)
      };
    case 'update':      
      const id = action.payload.id
      return { 
        ...state,
        formList: state.formList.map(row => {
          // row.options = action.payload.options
          return row.id === id ? { ...row, ...action.payload} : row
        })
      };
    case 'clear':
      return INITIAL_STATE;
    default:
      return {...INITIAL_STATE, ...state}
  }
}

const ViewCompliance = () => {
  // const [mutate, { isLoading: isApproving }] = useApproveComplianceMutation<{ mutate: ApproveType, isLoading: boolean }>()
  const [mutateDeny, { isLoading }] = useDenyComplianceMutation<{ mutateDeny: DenyType, isLoading: boolean }>()
  const [mutate, { isLoading:  isFetching }] = useCreateCardAccountMutation<{ mutate: ApproveType, isLoading: boolean }>()
  const [mutateProv, { isLoading: isProving }] = useCreateProvidusAcctMutation<{ mutateProv: DenyType, isLoading: boolean }>()
  const [mutateUpdate, { isLoading: isUpdating }] = useActivateUserMutation<{ mutateUpdate: ApproveType, isLoading: boolean }>()
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()
  const appDispatch = useAppDispatch()
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const drawer = useAppSelector(selectDrawer)
  const companyData = useAppSelector(selectCompanyData)
  const isFetchingComppany = useAppSelector(selectFetchingCompany);
  const userData = useAppSelector(selectUserDetails)

  const modalRef = useRef<ModalRefObject>(null);
  const inputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false);  
  const [isApprovalModal, setIsApprovalModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [imgLink, setImgLink] = useState('')
  
  const handleInput = useCallback((e: any, item: DenyFormList,  idx: number) => {
    const { name, value } = e.target
    dispatch({ type: 'update', payload: {
      id: idx+1,
      inputValue: { ...item.inputValue, [name]: value } as typeof company
    }})    
  }, [dispatch])
  
  const handleSelect = useCallback((e: any, idx: number) => {
    const { value } = e;    
    dispatch({ type: 'update', payload: {
      id: idx+1,
      name: value,
      selectedValue: [e]
    }})
  }, [dispatch])

  const handleDelete = useCallback((item: DenyFormList, idx: number) => {
    dispatch({ type: 'remove', payload: item })
  }, [dispatch])

  const handleDisabled = (item: DenyFormList) => {
    if (!item.name) {
      LOG_STATE.msg = 'Input is disabled. Select an error name '
      LOG_STATE.location = 'View compliance'
      appDispatch(addLog(LOG_STATE))
    }
  }
  
  const listObj = useMemo(() => ({
    id: 1,
    name: '' as keyof typeof company,
    handleSelect,
    handleInput,
    handleDelete,
    handleDisabled,
  }), [handleSelect, handleInput, handleDelete ]) as DenyFormList  

  const handleExit = useCallback((e: TargetedEvent<any, Event>) => {
    e.preventDefault();
    e.stopPropagation()
    navigate(`${USERS}/${userId}`)
    setOpen(false)
  }, [navigate, userId])

  const preventExit = (e: TargetedEvent<any, Event>) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (!open) setOpen(true)
  }, [open])

  useEffect(() => {
    return () => setOpen(false)
  }, [])  

  const openApprovalModal = (e: TargetedEvent<any, Event>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsApprovalModal(true)
    modalRef.current?.openDialog()
  }

  const openDenyModal = (e: TargetedEvent<any, Event>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsApprovalModal(false)
    modalRef.current?.openDialog()
  }

  const handleBrexAcct = useCallback(async (e: TargetedEvent<any, Event>) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log('hhh', inputRef?.current.value)
    try {
      if (userId && inputRef.current?.value) {
        await mutate({ 
          userId: userId,
          email: inputRef.current?.value
        })
      } else {
        LOG_STATE.msg = 'Email can not be blank'
        appDispatch(addLog(LOG_STATE))
      }
    } catch (e) {
        console.log(e)
    }
  }, [userId, inputRef, appDispatch])

  const handleProvidusAcct = useCallback(async (e: TargetedEvent<any, Event>) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log('hhh', inputRef?.current.value)
    try {
        await mutateProv({ 
          userId: userId,
        })
    } catch (e) {
        console.log(e)
    }
  }, [userId, inputRef, appDispatch])

  const handleUpdate = useCallback(async (e: TargetedEvent<any, Event>) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log('hhh', inputRef?.current.value)
    try {
      if (userId) {
        await mutateUpdate({ 
          userId: userId,
          status: 'ACTIVE'
        })
      }
    } catch (e) {
        console.log(e)
    }
  }, [userId, inputRef, appDispatch])

  const handleModalExit = () => {
    let formArr: DenyFormList
    dispatch({ type: 'clear', payload: {} as typeof formArr })
    setImageModal(false);
    setImgLink('')
    setIsApprovalModal(false)
  }

  const handleDeny = useCallback(async (e: TargetedEvent<any, Event>) => {
    e.preventDefault()
    e.stopPropagation()

    console.log(state.formList);
    

    const isValue = state.formList.some(x => !x?.name || (x?.inputValue ? !x?.inputValue[x?.name] : ''))
    try {
      if (userId && state.formList.length && !isValue) {
        const body: Partial<Company> = {};
        state.formList.map(item => {
          if (item.inputValue && item.name) {
            const key = item.name as keyof typeof company;
            Object.assign(body, { [key]: item.inputValue[item.name] });
          }
        }) 
        console.log(body);
        
        await mutateDeny({ 
          userId: userId,
          body: body,
        })
        // LOG_STATE.msg = "Error set successfully"
        // LOG_STATE.variant = "success"
        // appDispatch(addLog(LOG_STATE))
        
      } else {
        LOG_STATE.msg = 'Errors can not be empty'
        appDispatch(addLog(LOG_STATE))
      }
    } catch (e) {
        console.log(e)
    }
  }, [state.formList]) 
  
  const addErrors = useCallback(() => {
    dispatch({ type: 'add', payload: listObj })
  }, [listObj, dispatch])

  const RenderComplianceModal = useMemo(() => 
    isApprovalModal && !imageModal ? 
    <ApproveModal 
      isLoading={[isFetching, isProving, isUpdating]}
      user={userData}
      handleBrexAcct={handleBrexAcct}
      handleProvidusAcct={handleProvidusAcct}
      handleUpdate={handleUpdate}
      inputRef={inputRef}
    /> : !isApprovalModal && !imageModal ?
    <DenyModal 
      handleDeny={handleDeny} 
      formList={state.formList} 
      isLoading={isLoading}
      addErrors={addErrors}
      options={options}
    /> : <></>
  , [isApprovalModal, isFetching, inputRef, handleBrexAcct, 
    handleProvidusAcct, handleUpdate, userData,
    handleDeny, state.formList, isLoading, addErrors, imageModal])

  const RenderImageModal = useMemo(() => {
    setIsApprovalModal(false)
    return imageModal ? <ImageModal link={imgLink} /> : <></>
  }, [imageModal])

  const handleImgModal = (link: unknown) => {
    console.log('hheh');
    
    setImgLink(typeof link === 'string' ? link : '')
    setImageModal(true)
    modalRef.current?.openDialog()
  }
  
  return (
    <Portal isOpen={open} handleClick={handleExit}>
      <Stack direction="row" alignItems="center" mt={9} spacing={2}>
        <StackCard onClick={preventExit} drawer={drawer}>
          <Text fsz={30} fw={600} mt={1} mb={1} ml={3}>Company Info</Text>
          <StackDetails 
            idxArr={companyIdxArr} 
            labels={companyLabels} 
            details={companyData} 
            columns={companyColumns} 
            loading={isFetchingComppany}
            handleLink={handleImgModal}
            sx={{ height: 'max-content', width: '95%', maxWidth: '95%' }}
          />
        </StackCard>
        <Stack alignItems="center" onClick={preventExit}>
          <ActionBtn onClick={openApprovalModal} btnname="Approve" />
          <CompareIcon color="inherit" fontSize="large" />
          <ActionBtn btnname="Deny" onClick={openDenyModal} />
        </Stack>
        <StackCard onClick={preventExit} drawer={drawer} loading={0}>
          <Text fsz={30} fw={600} mt={1} mb={1} ml={3}>Compliance Info</Text>
          <StackDetails 
              idxArr={companyIdxArr} 
              labels={companyLabels} 
              details={companyData} 
              columns={companyColumns} 
              loading={isFetchingComppany}
              sx={{ height: 'max-content', width: '95%', maxWidth: '95%' }}
            />
        </StackCard>
      </Stack>
      <Modal ref={modalRef} onClose={handleModalExit}>
        {RenderComplianceModal}
        {RenderImageModal}
      </Modal>
    </Portal>
  )
}

const StackCard = styled(BoxCard, 
  { shouldForwardProp: (prop: string) => prop !== 'drawer' })(
  ({ theme, drawer, loading }) => ({
    ...(!loading && {     
      ...entering(theme, 'width')
    }),
    overflowX: 'hidden',
    overflowY: 'auto',
    height: 600,
    maxHeight: 600,
    width: 450,
    maxWidth: 450,
    position: 'relative',
    ...(drawer && {
      ...entering(theme, 'margin-left'),
      marginLeft: loading ?? DRAWER_WIDTH
    }),
    ...(!drawer && {
      ...leaving(theme, 'margin-left'),
      marginLeft: 0
    })
}))

export default ViewCompliance