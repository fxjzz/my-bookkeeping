import { defineComponent, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

export const App = defineComponent({
    setup(){
        return ()=><>
        <header>导航</header>
        <ul>
            <li>
                <RouterLink to="/">Foo</RouterLink>
            </li>
            <li>
                <RouterLink to="/xxx">Bar</RouterLink>
            </li>
        </ul>
        <div>
            <RouterView/>
        </div>
        </>
    }
})