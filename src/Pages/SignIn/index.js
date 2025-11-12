import "./sign-in.scss";
import "../../Sass/form.scss";
import { getSignIn } from "../../Services/SignIn";
import { message } from "antd"
import { useNavigate } from "react-router-dom";
import { setUserCookie } from "../../Utils/Cookie";
function SignIn() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        const response = await getSignIn(email, password);
        if(response.length > 0) {
            const user = response[0];
            const { password, ...userCookie } = user;
            setUserCookie(userCookie);
            messageApi.open({
                type: "loading",
                content: "Loading...",
                duration: 2
            });
            setTimeout(() => {
                messageApi.open({
                    type: "success",
                    content: "Sign In Successfully!",
                    duration : 2,
                });
                
                setTimeout(() => {
                    navigate("/");
                    window.location.href = "/";
                }, 500);
            }, 2000);
        }
        else messageApi.error("Invalid email or password!");
    }

    return (
        <>  
            {contextHolder}
            <div className="sign-in">
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="form__heading">Sign In Quzzi</h2>
                    <div className="form__group">
                        <input type="email" placeholder="Enter Email..." className="form__input"/>
                    </div>

                    <div className="form__group">
                        <input type="password" placeholder="Enter Password..." className="form__input"/>
                    </div>

                    <button type="submit" className="form__button">
                        Sign In
                    </button>
                </form>
            </div>
        </>
    )
}
 
export default SignIn