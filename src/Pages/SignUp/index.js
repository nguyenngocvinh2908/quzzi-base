import "./sign-up.scss";
import { post } from "../../Utils/Api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { checkApi } from "../../Services/SignUp";
function SignUp() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const generateToken = (length = 20) => {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let token = "";
        for (let i = 0; i < length; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return token;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[1].value;
        const checkEmail = await checkApi("email", email);
        if (checkEmail.length > 0) {
            messageApi.open({
                type: "error",
                content: "This email already exists!",
                duration: 2,
            });
        } else {
            const fullName = e.target[0].value;
            const password = e.target[2].value;
            const token = generateToken();
            const newUser = { fullName, email, password, token };

            const response = await post("users", newUser);
            if (response) {
                messageApi.open({
                    type: "loading",
                    content: "Loading...",
                    duration: 2,
                });

                setTimeout(() => {
                    messageApi.open({
                        type: "success",
                        content: "Sign Up Successfully!",
                        duration: 2,
                    });

                    setTimeout(() => {
                        navigate("/signin");
                        window.location.href = "/signin";
                    }, 500);
                }, 2000);
            }
        }
    };

    return (
        <>
            {contextHolder}
            <div className="signup">
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="form__heading">Sign Up Quzzi</h2>

                    <div className="form__group">
                        <input
                            type="text"
                            placeholder="Enter Full Name..."
                            className="form__input"
                            required
                        />
                    </div>

                    <div className="form__group">
                        <input
                            type="email"
                            placeholder="Enter Email..."
                            className="form__input"
                            required
                        />
                    </div>

                    <div className="form__group">
                        <input
                            type="password"
                            placeholder="Enter Password..."
                            className="form__input"
                            required
                        />
                    </div>

                    <div className="form__group">
                        <input
                            type="password"
                            placeholder="Enter-R Password..."
                            className="form__input"
                            required
                        />
                    </div>

                    <div className="form__group form__group--text-align">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            required
                        />
                        <label className="form__label"></label>
                    </div>

                    <button type="submit" className="form__button">
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
}

export default SignUp;
