import { Overlay as VOverlay } from 'vant'
import { defineComponent, PropType, reactive, ref, Transition } from 'vue'
import { ItemSummary } from '../components/item/ItemSummary'
import { Form, FormItem } from '../shared/Form'
import { Icon } from '../shared/Icon'
import { Overlay } from '../shared/Overlay'
import { Tab, Tabs } from '../shared/Tabs'
import { Time } from '../shared/time'
import s from './TimeTabsLayout.module.scss'
import { MainLayout } from './MainLayout'
const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>
    },
    endDate: {
      type: String as PropType<string>
    }
  }
})
export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    },
    rerenderOnSwitchTab: {
      type: Boolean,
      default: false
    }
  },
  setup: (props, context) => {
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      document.documentElement.scrollTop = 0
      overlayVisible.value = !overlayVisible.value
    }
    const refSelected = ref('本月')
    const time = new Time()
    const tempTime = reactive({
      start: new Time().format(),
      end: new Time().format()
    })
    const customTime = reactive<{
      start?: string
      end?: string
    }>({})
    const timeList = [
      {
        start: time.firstDayOfMonth(),
        end: time.lastDayOfMonth()
      },
      {
        start: time.add(-1, 'month').firstDayOfMonth(),
        end: time.add(-1, 'month').lastDayOfMonth()
      },
      {
        start: time.firstDayOfYear(),
        end: time.lastDayOfYear()
      }
    ]
    const refOverlayVisible = ref(false)
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
      Object.assign(customTime, tempTime)
    }
    const onSelect = (value: string) => {
      if (value === '自定义时间') {
        refOverlayVisible.value = true
      }
    }
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <Icon name="menu" class={s.icon} onClick={onClickMenu} />,
          default: () => (
            <>
              <Tabs
                rerenderOrSelect={props.rerenderOnSwitchTab}
                v-model:selected={refSelected.value}
                onUpdate:selected={onSelect}
              >
                <Tab name="本月">
                  <props.component startDate={timeList[0].start.format()} endDate={timeList[0].end.format()} />
                </Tab>
                <Tab name="上月">
                  <props.component startDate={timeList[1].start.format()} endDate={timeList[1].end.format()} />
                </Tab>
                <Tab name="自定义时间">
                  <props.component startDate={customTime.start} endDate={customTime.end} />
                </Tab>
              </Tabs>
              <VOverlay show={refOverlayVisible.value} class={s.overlay}>
                <div class={s.overlay_inner}>
                  <header>请选择时间</header>
                  <main>
                    <Form onSubmit={onSubmitCustomTime}>
                      <FormItem label="开始时间" v-model={tempTime.start} type="date" />
                      <FormItem label="结束时间" v-model={tempTime.end} type="date" />
                      <FormItem>
                        <div class={s.actions}>
                          <button type="button">取消</button>
                          <button type="submit">确认</button>
                        </div>
                      </FormItem>
                    </Form>
                  </main>
                </div>
              </VOverlay>
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {overlayVisible.value && <Overlay onClose={() => (overlayVisible.value = false)} />}
              </Transition>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
