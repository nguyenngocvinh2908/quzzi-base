import { useRoutes } from "react-router-dom"
import { routers } from "../../Router";
function AllRoutes () {
    const elements  = useRoutes(routers);
    return (
        <>
            {elements}
        </>
    )
}

export default AllRoutes;