import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Content from "./Content";

function Layout() {
    return (
        <>
            <div className="layout">
                <Header />
                <Content />
                <Footer />
            </div>
        </>
    )
}
export default Layout