import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../../layout/MainLayout';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Icon } from '../../shared/Icon';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';

export const TagCreate = defineComponent({
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
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="larrow" class={s.icon} onClick={() => { }} />,
        default: () => (
          <TagForm />
        )
      }}</MainLayout>
    )
  }
})