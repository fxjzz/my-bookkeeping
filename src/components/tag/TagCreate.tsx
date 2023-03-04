import { defineComponent } from 'vue'
import { MainLayout } from '../../layout/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { TagForm } from './TagForm'

export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: () => <BackIcon />,
          default: () => <TagForm />
        }}
      </MainLayout>
    )
  }
})
