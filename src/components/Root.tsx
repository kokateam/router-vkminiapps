import React, { FC, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useRouterPanel, useRouterView, useRouterBack } from "../hooks/hooks";

import { history } from "../storage/atoms";

const Root: FC = ({ children }) => {
  const { toPanel } = useRouterPanel();
  const { toView } = useRouterView();
  const toBack = useRouterBack();
  const [state, setState] = useRecoilState(history);

  const stateRef = useRef(state);
  stateRef.current = state;

  // back event
  useEffect(() => {
    window.addEventListener("popstate", () => {
      const stateCurrent = stateRef.current;

      setState({
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

  return children;
};

export default Root;
