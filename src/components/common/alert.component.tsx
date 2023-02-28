import { memo, PropsWithChildren, useCallback, useEffect } from 'preact/compat';
import { TransitionHandler, useSnackbar, VariantType } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLog } from '../../redux/app-logs/app-log.selectors';
import InitialLogProps from '../../types/log-reducer.type';
import { clearLog } from '../../redux/app-logs/app-log.reducer';

const Alert = (props: PropsWithChildren) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch()
    const log = useAppSelector<InitialLogProps>(selectLog)

    const handleClickVariant = useCallback((msg: string, variant?: VariantType, exit?: TransitionHandler) => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(msg, { variant, preventDuplicate: true, onExited: exit });
    }, [])

    useEffect(() => {
      if (log?.msg) {
        handleClickVariant(
          log.msg, log.variant, 
          () => dispatch(clearLog())
        )
      }
    },[log])

    return <>{props.children}</>
}

export default memo(Alert)