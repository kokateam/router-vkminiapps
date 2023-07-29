import React, { FC, useEffect } from "react";

import { View as VKView } from "@vkontakte/vkui";
import { useRouterPanel, useRouterSettings } from "../hooks/hooks";

import bridge from "@vkontakte/vk-bridge";

export interface ViewProps {
  id: string;
  popout?: React.ReactNode;
  modal?: React.ReactNode;
  onTransition?(params: { isBack: boolean; from: string; to: string }): void;
  onSwipeBackStart?(): void;
  onSwipeBackCancel?(): void;
  children: React.ReactNode;
}

const View: FC<ViewProps> = (props) => {
  const [panel, toPanel] = useRouterPanel();
  const [settings] = useRouterSettings();

  useEffect(() => {
    if (settings.isInternal && settings.isSwipeBack) {
      bridge.send(
        panel.panels.length === 1
          ? "VKWebAppEnableSwipeBack"
          : "VKWebAppDisableSwipeBack"
      );
    }
  }, [settings.isInternal, settings.isSwipeBack]);

  return (
    <VKView
      activePanel={panel.active}
      history={settings.isSwipeBack ? panel.panels : undefined}
      onSwipeBack={settings.isSwipeBack ? () => toPanel(-1) : undefined}
      {...props}
    >
      {props.children}
    </VKView>
  );
};

export default View;
