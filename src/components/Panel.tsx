import React, { FC } from "react";
import { Panel as VKPanel, PanelProps } from "@vkontakte/vkui";

const Panel: FC<PanelProps> = (props) => (
  <VKPanel {...props}>{props.children}</VKPanel>
);

export default Panel;
