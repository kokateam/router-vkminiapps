import { useRecoilState } from "recoil";
import {
  useBack,
  usePanel,
  usePopout,
  useView,
  useModal,
} from "../storage/selectors/history";
import { isNum } from "../utils";

import {
  RouterBackI,
  RouterPanelI,
  RouterViewI,
  RouterPopoutI,
  RouterModalI,
} from "./interfaces";

export const useRouterView = (): RouterViewI => {
  const [view, toViewRouter] = useRecoilState(useView);

  const toView = (view) => {
    toViewRouter(view);

    return {
      action: "toView",
      value: view,
    };
  };

  return { view, toView };
};

export const useRouterPanel = (): RouterPanelI => {
  const [panel, toPanelRouter] = useRecoilState(usePanel);

  const toPanel = (panel) => {
    toPanelRouter(panel);

    return {
      action: "toPanel",
      mode: isNum(panel) ? "back" : "push",
      value: panel,
    };
  };

  return { panel, toPanel };
};

export const useRouterBack = (): ((step) => RouterBackI) => {
  const [, toBackRouter] = useRecoilState(useBack);

  return (step) => {
    toBackRouter(step);

    return {
      action: "toBack",
      value: step,
    };
  };
};

export const useRouterPopout = (): RouterPopoutI => {
  const [popout, toPopoutRouter] = useRecoilState(usePopout);

  const toPopout = (popoutF) => {
    toPopoutRouter(popoutF);

    return {
      action: "toPopout",
      mode: !popoutF ? "back" : "push",
    };
  };

  return { popout, toPopout };
};

export const useRouterModal = (): RouterModalI => {
  const [activeModal, toModalRouter] = useRecoilState(useModal);

  const toModal = (modal) => {
    toModalRouter(modal);

    return {
      action: "toModal",
      mode: isNum(modal) ? "back" : "push",
      value: modal,
    };
  };

  return <RouterModalI>{ activeModal, toModal };
};
