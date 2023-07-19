import { atom } from "recoil";

export interface settingsAtomI {
  isSwipeBack: boolean;
  isInternal: boolean;
  isHash: boolean;
  isBack: boolean;
  defaultView: string;
  defaultPanel: string;
}

export const settings = atom<settingsAtomI>({
  key: "@kokateam/router-vkminiapps/atoms/BhoZc4",
  default: {
    isSwipeBack: true,
    isInternal: false,
    isHash: true,
    isBack: true,
    defaultView: "",
    defaultPanel: "",
  },
});
