import { FC, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useRouterHooks, useRouterSettings } from "../hooks/hooks";

import { history as historyAtom } from "../storage/atoms";
import { mergeObjects } from "../utils";

const Root: FC = ({ props, children }) => {
  const { toPanel, toView, toBack } = useRouterHooks();
  const [settings, setSetting] = useRouterSettings();
  const [history, setHistoryState] = useRecoilState(historyAtom);

  const stateRef = useRef();
  stateRef.current = { history, settings };

  // back event
  useEffect(() => {
    window.addEventListener("popstate", () => {
      const { history, settings } = stateRef.current;
      if (!settings.isBack) return;

      setHistoryState({
        ...history,
        back_step: history.back_step === 0 ? -1 : history.back_step,
      });

      switch (history.back_action) {
        case "panel":
          toPanel("@kokateam/router_event_back");
          break;
        case "view":
          toView("@kokateam/router_event_back");
          break;
        default:
          toBack("@kokateam/router_event_back");
      }
    });
  }, []);

  // настройки роутера
  useEffect(() => {
    // @ts-ignore
    setSetting(mergeObjects(settings, props));
  }, []);

  return children;
};

export default Root;
