import { selector } from "recoil";
import { settings as _ } from "../atoms";

import { mergeObjects } from "../../utils";

export const useSettings = selector({
  key: "@kokateam/router-vkminiapps/selectors/k1zIL8",
  get: ({ get }) => get(_),
  set: ({ set, get }, value) => {
    const old = get(_);

    if (typeof value !== "object") return;

    // @ts-ignore
    set(_, mergeObjects(old, value));
  },
});
