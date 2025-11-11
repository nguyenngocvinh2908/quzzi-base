import { NavLink } from "react-router-dom"
import "./header.scss";
import { delUser, getUser, isAuthenticated } from "../../Utils/Cookie";
function Header () {
    const handleClickSignOut = () => {
        delUser();
        window.location.href("/");
    }
    return (
        <>
            <header className="header">
                <div className="header__logo">Quzzi</div>
                <div className="header__nav">
                    <ul className="header__list">
                        <li className="header__item">
                            <NavLink className="header__link" to="/">
                                Home
                            </NavLink>
                        </li>

                        {isAuthenticated() ? (
                            <>
                                <li className="header__item">
                                    <NavLink className="header__link" to="/topic">
                                        Topic
                                    </NavLink>
                                </li>

                                <li className="header__item">
                                    <NavLink className="header__link" to= "/answers">
                                        Answers
                                    </NavLink>
                                </li>
                            </>
                        ) : (<></>)}
                    </ul>

                    <div className="header__action">
                        {isAuthenticated() ? (
                            <>
                                <div className="header__signout">
                                    <NavLink className="header__link" onClick={handleClickSignOut} to="signin">Sign Out</NavLink>
                                </div>

                            </>
                        ) : (
                            <>
                                <div className="header__signin">
                                    <NavLink to="/signin" className="header__link">Sign In</NavLink>
                                </div>

                                <div className="header__signup">
                                    <NavLink to="/signup" className="header__link">Sign Up</NavLink>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;