import React, { FC, useEffect } from "react";
import { useRecoilState } from "recoil";

import { ModalRoot as VKModalRoot, ModalRootProps } from "@vkontakte/vkui";

import { structure } from "../storage/atoms";
import { useModal } from "../storage/selectors/history";

const ModalRoot: FC<ModalRootProps> = (props) => {
  const [state, setState] = useRecoilState(structure);
  const [activeModal, toModal] = useRecoilState(useModal);

  // заполняем стурктуру modals после заполнения основной структуры: Views, Panels
  useEffect(() => {
    if (!props.children || state.views.length === 0 || state.modals.length > 0)
      return;

    const modals = [] as string[];
    if (!Array.isArray(props.children)) {
      modals.push(props.children.props.id ?? props.children.props.nav);
    } else {
      props.children.map((modal) => {
        modals.push(modal.props.id ?? modal.props.nav);
      });
    }

    setState({ ...state, modals: modals });
  }, [state]);

  return (
    <VKModalRoot
      activeModal={activeModal}
      onClose={() => {
        toModal(-1);
        props.onClose && props.onClose();
      }}
      {...props}
    >
      {props.children}
    </VKModalRoot>
  );
};

export default ModalRoot;
