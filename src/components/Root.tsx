import React, { FC, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useRouterHooks, useRouterSettings } from "../hooks/hooks";

import { history, settings as settingsAtom } from "../storage/atoms";
import { mergeObjects } from "../utils";

const Root: FC = ({ props, children }) => {
  const { toPanel, toView, toBack } = useRouterHooks();
  const { settings } = useRouterSettings();

  const [historyState, setHistoryState] = useRecoilState(history);
  const [stateSettings, setSettingsState] = useRecoilState(settingsAtom);

  const stateRef = useRef(historyState);
  stateRef.current = historyState;

  // back event
  useEffect(() => {
    window.addEventListener("popstate", () => {
      if (!settings.isBack) return;

      const stateCurrent = stateRef.current;

      setHistoryState({
        ...stateCurrent,
        back_step: stateCurrent.back_step === 0 ? -1 : stateCurrent.back_step,
      });

      switch (stateCurrent.back_action) {
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
    setSettingsState(mergeObjects(stateSettings, props));
  }, []);

  return children;
};

export default Root;
