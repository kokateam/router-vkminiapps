import { atom } from "recoil";

const _ = atom({
  key: "@kokateam/settingsState",
  default: {
    isSwipeBack: true,
    isInternal: false,
    isHash: true,
    isBack: true,
    defaultView: "",
    defaultPanel: "",
  },
});

export default _;
