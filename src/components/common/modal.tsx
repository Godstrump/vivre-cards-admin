import { forwardRef, useImperativeHandle, useState, ForwardedRef } from 'preact/compat';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Props from '../../types/props.type';
import ModalRefObject from '../../types/model-ref-object';
import { styled } from '@mui/material';
import { entering, leaving } from '../../theme/transitions';
import { DRAWER_WIDTH } from '../../utils/constants';
import { useAppSelector } from '../../app/hooks';
import { selectDrawer } from '../../redux/users/user.selectors';

interface ModalProps extends Props {
  onClose: Function;
}

const Modal = ({ onClose, ...props}: ModalProps, ref: ForwardedRef<ModalRefObject>) => {
  const [open, setOpen] = useState(false);
  const drawer = useAppSelector(selectDrawer)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose()
  };

  useImperativeHandle(ref, () => ({
    openDialog: () => handleClickOpen(),
    onClose: () => handleClose()
  }));

  return (
      <ModalDialog
        drawer={drawer}
        PaperProps={{ 
          className: 
            open ? "animate__animated animate__zoomIn" 
            : "animate__animated animate__zoomOut",
          style: { width: '100%', height: 'max-content' } 
        }} open={open} onClose={handleClose}>
        <DialogContent>
          { props?.children }
        </DialogContent>
      </ModalDialog>
  );
}

const ModalDialog = styled(Dialog, 
  { shouldForwardProp: (prop: string) => prop !== 'drawer' })(
  ({ theme, drawer, loading }) => ({
    ...(!loading && {     
      ...entering(theme, 'width')
    }),
    ...(drawer && {
      ...entering(theme, 'margin-left'),
      marginLeft: DRAWER_WIDTH
    }),
    ...(!drawer && {
      ...leaving(theme, 'margin-left'),
      marginLeft: 0
    })
}))

export default forwardRef(Modal);
