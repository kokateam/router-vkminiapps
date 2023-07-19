import { atom } from "recoil";

export interface structureAtomI {
  views: Array<string>;
  panels: object;
  modals: Array<string>;
}

export const structure = atom<structureAtomI>({
  key: "@kokateam/router-vkminiapps/atoms/82kWuD",
  default: {
    views: [],
    panels: {},
    modals: [],
  },
});
