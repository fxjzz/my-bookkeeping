import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../../layout/MainLayout';
import { Button } from '../../shared/Button';
import { Icon } from '../../shared/Icon';
import { Rules, validate } from '../../shared/validate';
import { TagForm } from './TagForm';
import s from './Tag.module.scss';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: ''
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onSubmit = (e: Event) => {
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', message: '只能填 1 到 4 个字符', regex: /^.{1,4}$/ },
        { key: 'sign', type: 'required', message: '请选中一个emoji' }
      ]
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
      e.preventDefault()
    }
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <Icon name='larrow' class={s.icon} onClick={() => { }} />,
          default: () => <>
            <TagForm />
            <div class={s.actions}>
              <Button level='danger' class={s.removeTags} onClick={() => { }}>删除标签</Button>
              <Button level='danger' class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
            </div>
          </>
        }}
      </MainLayout>
    )


  }
})