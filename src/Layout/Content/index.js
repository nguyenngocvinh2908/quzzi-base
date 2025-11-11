import { Outlet } from "react-router-dom";

function Content () {
    return (
        <>
            <main className="main">
                <Outlet />
            </main>
        </>
    )
}

export default Content;