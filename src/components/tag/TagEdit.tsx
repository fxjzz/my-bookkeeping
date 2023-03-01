import { defineComponent, PropType, reactive } from "vue";
import { MainLayout } from "../../layout/MainLayout";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import { Rules, validate } from "../../shared/validate";
import { TagForm } from "./TagForm";
import s from "./Tag.module.scss";
import { BackIcon } from "../../shared/BackIcon";
import { useRoute } from "vue-router";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const id = parseInt(route.params.id.toString()); //tag id
    return () => (
      <MainLayout>
        {{
          title: () => "编辑标签",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={id} />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTags} onClick={() => {}}>
                  删除标签
                </Button>
                <Button
                  level="danger"
                  class={s.removeTagsAndItems}
                  onClick={() => {}}
                >
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

