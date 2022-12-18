import { defineComponent, ref } from "vue";
import { TimeTabsLayout } from "../../layout/TimeTabsLayout";
import { ItemSummary } from "./ItemSummary";
export const ItemList = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false);
    return () =>
      <TimeTabsLayout component={ItemSummary}/>
  },
});
