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
  toPopout: (
    popoutF: ReactNode | null,
    data?: any
  ) => {
    action: string;
    mode: string;
  };
}

export interface RouterModalI {
  activeModal: string | null;
  toModal: (
    modal: string | number,
    data?: any
  ) => {
    action: string;
    mode: string;
    value: string | number;
  };
}

export interface RouterSettingsI<T extends settingsAtomI> {
  settings: T;
  setSettings: (value: Partial<T>) => {
    action: string;
  };
}

export interface RouterClearHistory {
  canUsed: boolean;
  clearHistory: () => void;
}

export interface RouterHooksI {
  activeView: RouterViewI["view"];
  panel: RouterPanelI["panel"];
  popout: RouterPopoutI["popout"];
  activeModal: RouterModalI["activeModal"];
  settings: RouterSettingsI<typeof RouterSettingsC>["settings"];
  canUseClearHistory: RouterClearHistory["canUsed"];
  toView: RouterViewI["toView"];
  toPanel: RouterPanelI["toPanel"];
  toPopout: RouterPopoutI["toPopout"];
  toModal: RouterModalI["toModal"];
  setSettings: RouterSettingsI<typeof RouterSettingsC>["setSettings"];
  clearHistory: RouterClearHistory["clearHistory"];
  toBack: (step: number | string) => RouterBackI;
  dataRouter: any;
}
