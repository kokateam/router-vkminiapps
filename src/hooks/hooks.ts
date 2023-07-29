import { useRecoilState, useRecoilValue } from "recoil";
import {
  useBack,
  usePanel,
  usePopout,
  useView,
  useModal,
  useSettings,
  useData,
} from "../storage/selectors";
import { isNum } from "../utils";

import {
  RouterBackI,
  RouterPanelI,
  RouterViewI,
  RouterPopoutI,
  RouterModalI,
  RouterHooksI,
  RouterSettingsI,
} from "./interfaces";

import { RouterSettingsC } from "./constants";

export const useRouterView = (): [
  RouterViewI["view"],
  RouterViewI["toView"]
] => {
  const [view, toViewRouter] = useRecoilState(useView);

  const toView = (view) => {
    toViewRouter(view);

    return {
      action: "toView",
      value: view,
    };
  };

  return [view, toView];
};

export const useRouterPanel = (): [
  RouterPanelI["panel"],
  RouterPanelI["toPanel"]
] => {
  const [panel, toPanelRouter] = useRecoilState(usePanel);

  const toPanel = (panel) => {
    toPanelRouter(panel);

    return {
      action: "toPanel",
      mode: isNum(panel) ? "back" : "push",
      value: panel,
    };
  };

  return [panel, toPanel];
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

export const useRouterPopout = (): [
  RouterPopoutI["popout"],
  RouterPopoutI["toPopout"]
] => {
  const [popout, toPopoutRouter] = useRecoilState(usePopout);

  const toPopout = (popoutF, data) => {
    toPopoutRouter({ popout: popoutF, data: data });

    return {
      action: "toPopout",
      mode: !popoutF ? "back" : "push",
    };
  };

  return [popout, toPopout];
};

export const useRouterModal = (): [
  RouterModalI["activeModal"],
  RouterModalI["toModal"]
] => {
  const [activeModal, toModalRouter] = useRecoilState(useModal);

  const toModal = (modal, data) => {
    toModalRouter({ modal: modal, data: data });

    return {
      action: "toModal",
      mode: isNum(modal) ? "back" : "push",
      value: modal,
    };
  };

  // @ts-ignore
  return [activeModal, toModal];
};

export const useRouterSettings = (): [
  RouterSettingsI<typeof RouterSettingsC>["settings"],
  RouterSettingsI<typeof RouterSettingsC>["setSettings"]
] => {
  const [settings, setState] = useRecoilState(useSettings);

  const setSettings = (value) => {
    const mergedSettings = { ...settings, ...value };
    setState(mergedSettings);
    return { action: "setSettings" };
  };

  return [settings, setSettings];
};

export const useRouterData: any = () => {
  return useRecoilValue(useData);
};

export const useRouterHooks = (): RouterHooksI => {
  const [, toView] = useRouterView();
  const [, toPanel] = useRouterPanel();
  const [, toPopout] = useRouterPopout();
  const [, toModal] = useRouterModal();
  const [, setSettings] = useRouterSettings();
  const toBack = useRouterBack();
  const dataRouter = useRouterData();

  return {
    toView,
    toPanel,
    toPopout,
    toModal,
    setSettings,
    toBack,
    dataRouter,
  };
};
