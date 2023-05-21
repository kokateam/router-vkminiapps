import React, { FC } from "react";

import { View as VKView, ViewProps } from "@vkontakte/vkui";
import { useRouterPanel } from "../hooks/hooks";

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
