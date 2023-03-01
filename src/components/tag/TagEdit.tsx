import { defineComponent } from "vue";
import { MainLayout } from "../../layout/MainLayout";
import { Button } from "../../shared/Button";
import { TagForm } from "./TagForm";
import s from "./Tag.module.scss";
import { BackIcon } from "../../shared/BackIcon";
import { useRoute, useRouter } from "vue-router";
import { http } from "../../shared/Http";
import { Dialog } from "vant";

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const id = parseInt(route.params.id.toString()); //tag id
    const router = useRouter();
    const onError = () => {
      Dialog.alert({ title: "提示", message: "删除失败" });
    };
    const onDelete = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: "确认",
        message: "你真的要删除吗？",
      });
      await http
        .delete(`/tags/${id}`, {
          withItems: options?.withItems ? "true" : "false",
        })
        .catch(onError);
      router.back();
    };
    return () => (
      <MainLayout>
        {{
          title: () => "编辑标签",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={id} />
              <div class={s.actions}>
                <Button
                  level="danger"
                  class={s.removeTags}
                  onClick={() => onDelete()}
                >
                  删除标签
                </Button>
                <Button
                  level="danger"
                  class={s.removeTagsAndItems}
                  onClick={() => onDelete({ withItems: true })}
                >
                  删除标签和记录
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});

