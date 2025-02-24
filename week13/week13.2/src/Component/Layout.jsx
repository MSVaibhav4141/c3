import { Main } from "./Main"
import { SideBar } from "./SideBar"

export const Layout = ({children}) => {

return <div className="w-screen font-display flex">
    <SideBar />
    <Main />
</div>
}