import { ReactNode } from "react";

export interface RouterViewI {
  view: string | number;
  toView: (view: string | number) => {
    action: string;
    value: string | number;
  };
}

export interface RouterPanelI {
  panel: { active: string; panels: Array<string> };
  toPanel: (panel: string | number) => {
    action: string;
    mode: string;
    value: string | number;
  };
}

export interface RouterBackI {
  action: string;
  value: number;
}

export interface RouterPopoutI {
  popout: ReactNode | null;
  toPopout: (popoutF: ReactNode | null) => {
    action: string;
    mode: string;
  };
}

export interface RouterModalI {
  activeModal: string | null;
  toModal: (modal: string | number) => {
    action: string;
    mode: string;
    value: string | number;
  };
}

export interface RouterHooksI {
  toView: RouterViewI["toView"];
  toPanel: RouterPanelI["toPanel"];
  toPopout: RouterPopoutI["toPopout"];
  toModal: RouterModalI["toModal"];
  toBack: (step: number | string) => RouterBackI;
}
