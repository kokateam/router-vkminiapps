import { ReactNode } from "react";
import { settingsAtomI } from "../storage/atoms";
import { RouterSettingsC } from "./constants";

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

export interface RouterSettingsI<T extends settingsAtomI> {
  settings: T;
  setSettings: (value: T) => {
    action: string;
  };
}

export interface RouterHooksI {
  toView: RouterViewI["toView"];
  toPanel: RouterPanelI["toPanel"];
  toPopout: RouterPopoutI["toPopout"];
  toModal: RouterModalI["toModal"];
  setSettings: RouterSettingsI<typeof RouterSettingsC>["setSettings"];
  toBack: (step: number | string) => RouterBackI;
}
