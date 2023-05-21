import React, { FC } from "react";
import { RecoilRoot, RecoilRootProps } from "recoil";
import Root from "./Root";

const RouterRoot: FC<RecoilRootProps> = (props) => (
  <RecoilRoot {...props}>
    <Root>{props.children}</Root>
  </RecoilRoot>
);

export default RouterRoot;
