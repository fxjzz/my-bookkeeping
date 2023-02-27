import { defineComponent, onMounted, PropType, ref } from "vue";
import { MainLayout } from "../../layout/MainLayout";
import { Button } from "../../shared/Button";
import { http } from "../../shared/Http";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    const refPage = ref(0)
    const refHasMore = ref(false)
    const onLoadMore = async () => {
      const response = await http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        page: refPage.value + 1,
        _mock: 'tagIndex'
      })
      const { resources, pager } = response.data
      refExpensesTags.value.push(...resources)
      refHasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      refPage.value += 1
    }
    onMounted(async () => {
      const response = await http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        _mock: 'tagIndex'
      })
      const { resources, pager } = response.data
      refExpensesTags.value = resources
      refHasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      refPage.value = 1
    })
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'income',
        _mock: 'tagIndex'
      })
      refIncomeTags.value = response.data.resources
    })
    const refExpensesTags = ref<Tag[]>([]);
    const refIncomeTags = ref<Tag[]>([]);
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="larrow" class={s.navIcon} />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={refKind.value} class={s.tabs}>
                  <Tab name="支出">
                    <div class={s.tags_wrapper}>
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <Icon name="add" class={s.createTag} />
                        </div>
                        <div class={s.name}>
                          新增
                        </div>
                      </div>
                      {refExpensesTags.value.map(tag =>
                        <div class={[s.tag, s.selected]}>
                          <div class={s.sign}>
                            {tag.sign}
                          </div>
                          <div class={s.name}>
                            {tag.name}
                          </div>
                        </div>
                      )}
                    </div>
                    <div class={s.more}>
                      {refHasMore.value ?
                        <Button class={s.loadMore} onClick={onLoadMore}>加载更多</Button> :
                        <span class={s.noMore}>没有更多</span>
                      }
                    </div>
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {refIncomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
