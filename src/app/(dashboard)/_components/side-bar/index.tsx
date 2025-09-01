import Menu from "./menu";
import SideBarHeader from "./side-bar-heder";


export default function SideBar() {
    return (
        <aside className="bg-blue-50 min-h-screen w-md p-10 flex flex-col gap-y-16 fixed top-0 bottom-0 left-0">
            {/* Header */}
            <SideBarHeader />

            {/* Menu */}
            <Menu />

        </aside>
    )
}
