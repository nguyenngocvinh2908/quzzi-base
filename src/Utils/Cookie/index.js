import Cookies from "js-cookie";

const COOKIE_KEY = "user";

// Lưu Thông Tin Người Dùng
export const setUserCookie = (data, days = 1) => {
    Cookies.set(COOKIE_KEY, JSON.stringify(data), {expires: days});
};

// Lấy Thông Tin Người Dùng
export const getUser = () => {
    const user = Cookies.get(COOKIE_KEY);
    return user ? JSON.parse(user) : null;
}

// Kiểm Tra Đăng Nhập
export const isAuthenticated = () => {
    return !!Cookies.get(COOKIE_KEY);
}

// Xóa Thông Tin Đăng Nhập
export const delUser = () => {
    Cookies.remove(COOKIE_KEY);
}