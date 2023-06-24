import React, { FC } from "react";

import { View as VKView } from "@vkontakte/vkui";
import { useRouterPanel } from "../hooks/hooks";

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
  const { panel, toPanel } = useRouterPanel();

  return (
    <VKView
      activePanel={panel.active}
      history={panel.panels}
      onSwipeBack={() => toPanel(-1)}
      {...props}
    >
      {props.children}
    </VKView>
  );
};

export default View;
