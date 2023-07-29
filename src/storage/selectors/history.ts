import { DefaultValue, selector } from "recoil";
import { ReactNode } from "react";
import { history as AtomHistory, structure as AtomStructure } from "../atoms";

import { isElementsAfter, isNum, HistoryBackViews } from "../../utils";
import bridge from "@vkontakte/vk-bridge";

export const useView = selector<string | number>({
  key: "@kokateam/router-vkminiapps/selectors/GgxMyJ",
  get: ({ get }) => get(AtomHistory).activeView,
  set: ({ set, get }, view) => {
    // потому что recoil не дает нормально указать типы для view ¯\_(ツ)_/¯
    if (typeof view !== "string" && typeof view !== "number") {
      return;
    }

    const old = get(AtomHistory);

    let history = [...old.history];
    let activeView = old.activeView;
    const viewsHistory = [...old.views.history];
    const viewsPanels = { ...old.views.panels };
    const structureRouter = get(AtomStructure) as {
      views: string[];
      panels: object;
    };

    if (isNum(view)) {
      if (view >= 0)
        return console.error("[router] Не может быть больше или равно 0.");

      if (Math.abs(view as number) >= structureRouter.views.length)
        return console.error(
          "[router] Нельзя шагнуть назад на такое количество."
        );

      // @ts-ignore
      set(AtomHistory, {
        ...old,
        back_action: "view",
        back_step: view,
      });

      return window.history.go(view as number);
    }

    if (view === activeView) {
      return console.error("[router] Вы уже находитесь на этой View.");
    }

    if (view === "@kokateam/router_event_back") {
      const viewsDeleting = viewsHistory.splice(old.back_step);
      // история таких панелей возвращается в изначальное состояние
      viewsDeleting.map(
        (key) => (viewsPanels[key] = structureRouter.panels[key].slice(0, 1))
      );

      activeView = viewsHistory.slice(-1)[0];
      history = HistoryBackViews(old.back_step, history); // функция удаляет N View вместе с их Panel's
    } else {
      if (!structureRouter.views.includes(view as string)) {
        return console.error(
          `[router] Указанная вами View ${view} не существует.`
        );
      }

      if (viewsHistory.slice(-2, -1)[0] === view) {
        // @ts-ignore
        set(AtomHistory, {
          ...old,
          back_action: "view",
          back_step: -1,
        });

        return window.history.go(-1);
      }

      activeView = view as string;
      viewsHistory.push(view as string);
      // в историю добавляется view и её ласт панель
      history.push(
        { id: view as string, type: "view" },
        {
          id: old.views.panels[activeView].slice(-1)[0],
          main_view: view as string,
          type: "panel",
        }
      );
      window.history.pushState({ route: view }, view as string);
    }

    bridge.send("VKWebAppSetSwipeSettings", {
      history: old.views.panels[activeView].length === 1,
    });

    // @ts-ignore
    set(AtomHistory, {
      ...old,
      back_action: "back",
      back_step: 0,
      activeView: activeView,
      history: history,
      // устанавливаем последнюю панель из истории конкретной view
      activePanel: old.views.panels[activeView].slice(-1)[0],
      views: {
        history: viewsHistory,
        panels: viewsPanels,
      },
    });
  },
});

export const usePanel = selector<{ active: string; panels: string[] }>({
  key: "@kokateam/router-vkminiapps/selectors/DFqrXd",
  // @ts-ignore
  get: ({ get }) => {
    const state = get(AtomHistory);

    return {
      active: state.activePanel,
      panels: state.views.panels ? state.views.panels[state.activeView] : [],
    };
  },
  set: ({ set, get }, panel) => {
    // потому что recoil не дает нормально указать типы для panel ¯\_(ツ)_/¯
    if (typeof panel !== "string" && typeof panel !== "number") {
      return;
    }

    const old = get(AtomHistory);
    const structureRouter = get(AtomStructure);
    const history = [...old.history];
    let panels = [...old.views.panels[old.activeView]];

    if (isNum(panel)) {
      if (panel >= 0)
        return console.error("[router] Не может быть больше или равно 0.");
      if (Math.abs(panel) >= structureRouter.panels[old.activeView].length)
        return console.error(
          "[router] Нельзя шагнуть назад на такое количество."
        );

      set(AtomHistory, {
        ...old,
        back_action: "panel",
        back_step: panel,
      });

      return window.history.go(panel);
    }

    if (panel === old.activePanel) {
      return console.error("[router] Вы уже находитесь на этой Panel.");
    }

    if (panel === "@kokateam/router_event_back") {
      history.splice(old.back_step);
      panels.splice(old.back_step);
    } else {
      if (!structureRouter.panels[old.activeView].includes(panel)) {
        return console.error(
          `[router] Указанная вами Panel ${panel} внутри ${old.activeView} не существует`
        );
      }

      if (
        !isElementsAfter(
          structureRouter.panels[old.activeView],
          old.activePanel
        )
      ) {
        return console.error(
          `[router] Указанная вами Panel ${panel} после ${old.activePanel} не существует`
        );
      }

      panels.push(panel);
      history.push({ id: panel, main_view: old.activeView, type: "panel" });
      window.history.pushState({ route: panel }, panel as string);
    }

    bridge.send("VKWebAppSetSwipeSettings", { history: panels.length === 1 });

    // @ts-ignore
    set(AtomHistory, {
      ...old,
      back_action: "back",
      back_step: 0,
      activePanel: panels.slice(-1)[0],
      history: history,
      views: {
        ...old.views,
        panels: {
          ...old.views.panels,
          [old.activeView]: panels,
        },
      },
    });
  },
});

export const useBack = selector<number | string>({
  key: "@kokateam/router-vkminiapps/selectors/uO9ycL",
  get: () => 1,
  set: ({ set, get }, step) => {
    const old = get(AtomHistory);
    const structureState = get(AtomStructure);

    const history = [...old.history];
    // чтобы объект вместе со вложенными массивами был доступен для редактирования
    const viewsPanels = JSON.parse(JSON.stringify(old.views.panels));
    let viewsHistory = [...old.views.history];
    let activeModal = old.activeModal;
    let activePopout = old.activePopout;

    if (isNum(step)) {
      if (history.length - 2 < Math.abs(step as number))
        return console.error(
          "[router] Нельзя шагнуть на такое количество шагов назад."
        );

      // @ts-ignore
      set(AtomHistory, {
        ...old,
        back_action: "back",
        back_step: step,
      });

      return window.history.go(step as number);
    }

    if (step !== "@kokateam/router_event_back")
      return console.error(
        "[router] Нельзя передать в toBack строку. Только число < 0"
      );

    let historyDeleting = history.splice(old.back_step);
    if (history.slice(-1)[0].type === "view") {
      // если последний элемент оказался view, то нужно удалить и его
      const deleteCount =
        history.length > 3 && history.slice(-3)[0].type === "view" ? -2 : -1;
      // @ts-ignore
      historyDeleting = [...history.splice(deleteCount), ...historyDeleting];
    }

    activeModal =
      history.slice(-1)[0].type === "modal"
        ? (history.slice(-1)[0].id as string)
        : null;

    while (historyDeleting.length > 0) {
      const element = historyDeleting[0];

      if (element.id && element.type === "view") {
        // берем все panels этого view, которые нужно удалить из old.views.panels
        const deleteCount = historyDeleting.filter(
          (element) => element.main_view === element.id
        ).length;

        if (viewsPanels[element.id].length === deleteCount) {
          viewsPanels[element.id] = [structureState.panels[element.id][0]];
          viewsHistory = viewsHistory.filter((view) => view !== element.id);
        } else {
          viewsPanels[element.id].splice(-deleteCount);
          viewsHistory.splice(viewsHistory.lastIndexOf(element.id), 1);
        }

        if (viewsPanels[element.id].length === 0) {
          historyDeleting = historyDeleting.filter(
            (el) => el.main_view !== element.id
          ); // удаляем все панели, которые должны быть удалены, т.к. история вьюшки уже пустая
          viewsPanels[element.id] = [structureState.panels[element.id][0]]; // ставим по дефолту значение `[first_panel]`
        }

        historyDeleting = historyDeleting.filter((el) =>
          el.type === "view" ? el.id !== element.id : el.main_view !== el.id
        );
      }

      if (element.type === "panel") {
        const deleteCount = historyDeleting.filter(
          (el) => el.main_view === element.main_view
        ).length;

        // @ts-ignore
        viewsPanels[element.main_view].splice(-deleteCount);
        historyDeleting = historyDeleting.filter(
          (el) => el.main_view !== element.main_view
        );
      }

      if (element.type === "modal" || element.type === "popout") {
        historyDeleting.splice(0, 1);
      }

      //@todo: поддерждать в будущем историю из попоутов
      if (element.type === "popout") activePopout = null;
    }

    const lastActivePanel = [...history]
      .reverse()
      .find((obj) => obj.hasOwnProperty("main_view")) as {
      id: string;
      main_view: string;
    };

    // @ts-ignore
    set(AtomHistory, {
      ...old,
      back_action: "back",
      back_step: 0,
      activeModal: activeModal,
      activePopout: activePopout,
      activeView: lastActivePanel.main_view,
      activePanel: lastActivePanel.id,
      history: history,
      views: {
        history: viewsHistory,
        panels: viewsPanels,
      },
    });
  },
});

export const usePopout = selector<{
  popout: ReactNode | null | undefined;
  data: any;
}>({
  key: "@kokateam/router-vkminiapps/selectors/HC8Z1n",
  get: ({ get }) => get(AtomHistory).activePopout,
  set: ({ set, get }, popout) => {
    if (popout instanceof DefaultValue) return;
    const old = get(AtomHistory);

    if (!popout.popout) {
      if (!old.activePopout)
        return console.error("[router] Активного popout и так нет.");

      // @ts-ignore, шагаем назад
      set(AtomHistory, {
        ...old,
        back_action: "back",
        back_step: -1,
      });

      return window.history.go(-1);
    }

    window.history.pushState({ route: "popout" }, "popout");

    // @ts-ignore
    set(AtomHistory, {
      ...old,
      activePopout: popout.popout,
      history: [
        ...old.history,
        { component: popout, type: "popout", data: popout.data },
      ],
    });
  },
});

export const useModal = selector<
  { modal: string | null | number; data: any } | string | null
>({
  key: "@kokateam/router-vkminiapps/selectors/30i9Yx",
  get: ({ get }) => get(AtomHistory).activeModal,
  set: ({ set, get }, modal) => {
    // @ts-ignore
    if (!("modal" in modal) || !("data" in modal)) return;
    const old = get(AtomHistory);

    if (typeof modal.modal === "number") {
      if (modal.modal >= 0)
        return console.error("[router] Не может быть больше или равно 0.");

      // @ts-ignore
      set(AtomHistory, {
        ...old,
        back_action: "back",
        back_step: modal.modal,
      });

      return window.history.go(modal.modal);
    }

    window.history.pushState({ route: "modal" }, "modal");

    // @ts-ignore
    set(AtomHistory, {
      ...old,
      activeModal: modal.modal,
      history: [...old.history, { id: modal, type: "modal", data: modal.data }],
    });
  },
});

export const useData = selector<any>({
  key: "fsddfs",
  // берем последний элемент из history и возвращаем data
  get: ({ get }) => get(AtomHistory).history.slice(-1)[0]?.data,
});
