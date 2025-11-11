import PrivateRouters from "../Components/PrivateRouters";
import Layout from "../Layout";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn"
import SignUp from "../Pages/SignUp"
import Answers from "../Pages/Answers"
import Topic from "../Pages/Topic"
import Result from "../Pages/Result";
import Quzzi from "../Pages/Quzzi";

export const routers = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },

            {
                path: "signin",
                element: <SignIn />
            },

            {
                path: "signup",
                element: <SignUp />
            },

            {
                element: <PrivateRouters />,
                children: [
                    {
                        path: "answers",
                        element: <Answers />
                    },

                    {
                        path: "topic",
                        element: <Topic />
                    },

                    {
                        path: "result/:id",
                        element: <Result />
                    },

                    {
                        path: "quzzi/:id",
                        element: <Quzzi />
                    }
                ]
            }
        ]   
    }
]