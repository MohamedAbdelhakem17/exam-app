import Menu from "./menu";
import SideBarHeader from "./side-bar-heder";


export default function SideBar() {
    return (
        <aside className="bg-blue-50 h-scree w-md p-10 flex flex-col gap-y-16">
            {/* Header */}
            <SideBarHeader />

            {/* Menu */}
            <Menu />

        </aside>
    )
}
