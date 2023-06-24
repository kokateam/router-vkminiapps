import React, { FC, useEffect } from "react";
import { useRecoilState } from "recoil";

import { Epic as VKEpic } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { structure, history } from "../storage/atoms";

interface EpicProps extends React.HTMLAttributes<HTMLDivElement> {
  tabbar?: React.ReactNode;
  children: React.ReactNode;
}

const Epic: FC<EpicProps> = (props) => {
  const [, setStructure] = useRecoilState(structure);
  const [historyState, setHistory] = useRecoilState(history);

  useEffect(() => {
    if (!props.children) return;
    let structure = { views: [] as string[], panels: {} };

    //составляем structure VKMA

    // одна View
    if (!Array.isArray(props.children)) {
      structuring(props.children.props);
    } else {
      props.children.map((view) => {
        structuring(view.props);
      });
    }

    function structuring(props) {
      let { id, nav, children } = props as {
        id: string;
        nav: string;
        children: any;
      };
      id = id ?? nav;

      structure.panels[id] = [];
      structure.views.push(id);

      if (!Array.isArray(children)) {
        structure.panels[id].push(children.props.id ?? children.props.nav);
      } else {
        children.map((panel) =>
          structure.panels[id].push(panel.props.id ?? panel.props.nav)
        );
      }
    }

    setStructure({ ...structure, modals: [] });

    bridge.send("VKWebAppSetSwipeSettings", { history: true });

    // создаем историю, где
    // @activeView: первое значение в structure.views
    // @activePanel: первое значение panel в первом structure.views
    // @views: [ nav: string, history: Array<string> ]
    setHistory({
      ...historyState,
      activeView: structure.views[0],
      activePanel: structure.panels[structure.views[0]][0],
      history: [
        { id: structure.views[0], type: "view" },
        {
          id: structure.panels[structure.views[0]][0],
          type: "panel",
          main_view: structure.views[0],
        },
      ],
      views: {
        history: [structure.views[0]],
        panels: Object.fromEntries(
          Object.entries(structure.panels).map(([key, value]) => [
            key,
            // @ts-ignore
            [value[0]],
          ])
        ),
      },
    });
  }, []);

  return (
    <VKEpic activeStory={historyState.activeView} {...props}>
      {props.children}
    </VKEpic>
  );
};

export default Epic;
