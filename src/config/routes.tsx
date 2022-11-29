import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { Welcome } from "../views/Welcome";
import { FirstActions } from "../components/welcome/FirstActions";
import { ForthActions } from "../components/welcome/ForthActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { StartPage } from "../views/StartPage";
export const routes:RouteRecordRaw[] = [
    {path:'/',redirect:'/welcome'},
    {path:'/welcome',component:Welcome,
    children:[
        {path:'',redirect:'/welcome/1'},
        {path:'1',name:"Welcome1",components:{main:First,footer:FirstActions}},
        {path:'2',name:"Welcome2",components:{main:Second,footer:SecondActions}},
        {path:'3',name:"Welcome3",components:{main:Third,footer:ThirdActions}},
        {path:'4',name:"Welcome4",components:{main:Forth,footer:ForthActions}},
    ]},
    {path:'/start',component:StartPage}
]