import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { Charts } from '../components/statistics/Charts'
import { TimeTabsLayout } from '../layout/TimeTabsLayout'
import { FloatButton } from '../shared/FloatButton'
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <>
        <TimeTabsLayout rerenderOnSwitchTab={true} component={Charts} />
        <RouterLink to={'/items/create'}>
          <FloatButton />
        </RouterLink>
      </>
    )
  }
})
