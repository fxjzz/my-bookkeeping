import { defineComponent, ref, Transition } from "vue";
import { RouterLink } from "vue-router";
import { MainLayout } from "../layout/MainLayout";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Overlay } from "../shared/Overlay";
import s from "./StartPage.module.scss";

export const StartPage = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false);
    const onClick = () => {
      console.log("hi");
    };
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value;
    };
    return () => (
      <MainLayout class={s.wrapper}>
        {{
          title: () => "山竹记账",
          icon: () => (
            <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
          ),
          default: () => (
            <>
              <Center class={s.icon_wrapper}>
                <Icon name="money" class={s.icon} />
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button} onClick={onClick}>
                    开始记账
                  </Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton />
              </RouterLink>
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {overlayVisible.value && (
                  <Overlay onClose={() => (overlayVisible.value = false)} />
                )}
              </Transition>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

