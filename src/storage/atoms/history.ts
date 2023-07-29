import { atom } from "recoil";
import { ReactNode } from "react";

export interface historyAtomI {
  back_step: number;
  back_action: "view" | "panel" | "back" | "";
  activeView: string;
  activePanel: string;
  activeModal: string | null;
  activePopout: ReactNode | null;
  history: Array<{
    id?: string;
    component?: ReactNode;
    type: "view" | "panel" | "popout" | "modal";
    main_view?: string;
    data?: any;
  }>;
  views: { history: Array<string>; panels: object };
}

export const history = atom<historyAtomI>({
  key: "@kokateam/router-vkminiapps/atoms/baJJ1m",
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
    views: { history: [], panels: {} },
  },
});
