import { atom } from "recoil";

const _ = atom({
  key: "@kokateam/structureState",
  default: {
    views: [] as string[],
    panels: {},
    modals: [] as string[],
  },
});

export default _;
