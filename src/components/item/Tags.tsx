import { defineComponent, PropType, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Button } from '../../shared/Button'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon'
import { useTags } from '../../shared/useTags'
import s from './Tags.module.scss'
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true
    },
    selected: Number
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const { tags, hasMore, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>(
        '/tags',
        {
          kind: props.kind,
          page: page + 1
        },
        {
          _mock: 'tagIndex',
          _autoLoading: true
        }
      )
    })
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id)
    }
    const timer = ref<any>()
    const currentTag = ref<HTMLDivElement>()
    const onLongPress = (id: number) => {
      router.push(`/tags/${id}/edit?kind=${props.kind}`)
    }
    const onTouchStart = (tag: Tag, e: TouchEvent) => {
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = setTimeout(() => {
        onLongPress(tag.id)
      }, 500)
    }
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value)
    }
    const onTouchMove = (e: TouchEvent) => {
      const pointedEl = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if (currentTag.value !== pointedEl && currentTag.value?.contains(pointedEl) === false) {
        clearTimeout(timer.value)
      }
    }
    return () => (
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
            <div class={s.sign}>
              <Icon name="add1" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
          </RouterLink>
          {tags.value.map((tag) => (
            <div
              class={[s.tag, props.selected === tag.id ? s.selected : '']}
              onClick={() => onSelect(tag)}
              onTouchstart={(e) => onTouchStart(tag, e)}
              onTouchend={onTouchEnd}
            >
              <div class={s.sign}>{tag.sign}</div>
              <div class={s.name}>{tag.name}</div>
            </div>
          ))}
        </div>
        <div class={s.more}>
          {hasMore.value ? (
            <Button class={s.loadMore} onClick={fetchTags}>
              加载更多
            </Button>
          ) : (
            <span class={s.noMore}>没有了...</span>
          )}
        </div>
      </>
    )
  }
})
