import { atom } from "recoil";
import { ReactNode } from "react";

const _ = atom({
  key: "@kokateam/historyState",
  default: {
    back_step: 0,
    back_action: "",
    activeView: "",
    activePanel: "",
    activeModal: null as string | null,
    activePopout: null as ReactNode | null,
    history: [] as Array<{
      id?: string;
      component?: ReactNode;
      type: "view" | "panel" | "popout" | "modal";
      main_view?: string;
    }>,
    views: {} as { history: Array<string>; panels: object },
  },
});

export default _;
