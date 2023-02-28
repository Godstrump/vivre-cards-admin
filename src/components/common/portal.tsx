import { createPortal, PropsWithChildren, TargetedEvent } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import styled from "@mui/system/styled";

export interface ModalProps {
  isOpen: boolean;
  handleClick: (e: TargetedEvent<any, Event>) => void;
}
export default function Portal(props: PropsWithChildren<ModalProps>) {
  const { isOpen } = props;

  const el = useRef(document.createElement("div"));
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const _el = el.current;
    modalRoot?.appendChild(_el);

    return () => {
      modalRoot?.removeChild(_el);
    };
  }, [modalRoot]);

  if (!isOpen) return null;

  const modal = (
    <PortalContainer onClick={props?.handleClick}>
      {props.children}
    </PortalContainer>
  );

  return createPortal(modal, el.current);
}

const PortalContainer = styled('div')(({theme, ...props}) =>`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`);


