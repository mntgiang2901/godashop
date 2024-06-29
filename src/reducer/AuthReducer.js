import { LOGIN, LOGOUT, UPDATE_LOGGED_USER } from "../const/AuthConstant";

const authInfo = localStorage.getItem("authInfo");
let initialState;
if (!authInfo) {
    initialState = { isLogin: false, access_token: null, loggedUser: null }
}
else {
    // Chuyển ngược lại từ chuỗi sang object
    initialState = JSON.parse(authInfo);
}

// state lưu 3 thông tin: isLogin, access_token, loggedUser
// isLogin để biết rằng đã login vào hệ thống chưa
// access_token để lấy thông tin (student, register, subject)
// loggedUser để hiển thị thông tin người đăng nhập lên trang web
// current state + action = new state
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            {
                const new_state = {
                    isLogin: true,
                    access_token: action.payload.access_token,
                    loggedUser: action.payload.loggedUser
                };
                //luu xuong localStorage của trình duyệt để khi tắt trang web hay refresh trang web thì thông tin login vẫn còn
                // Khi refresh trang web thì store của redux bị ngủm nên thông tin login bị mất. Cần localStorage để lưu lại
                localStorage.setItem("authInfo", JSON.stringify(new_state));
                return new_state;
            }
        case UPDATE_LOGGED_USER:
            {
                const new_state = {
                    ...state,
                    loggedUser: action.payload.loggedUser
                };
                //luu xuong localStorage của trình duyệt để khi tắt trang web hay refresh trang web thì thông tin login vẫn còn
                // Khi refresh trang web thì store của redux bị ngủm nên thông tin login bị mất. Cần localStorage để lưu lại
                localStorage.setItem("authInfo", JSON.stringify(new_state));
                return new_state;
            }
        case LOGOUT:
            {
                const new_state = {
                    isLogin: false,
                    access_token: null,
                    loggedUser: null
                };
                localStorage.setItem("authInfo", JSON.stringify(new_state));
                return new_state;
            }

        default:
            //giữ nguyên state hiện tại nếu không có action nào phù hợp với tiêu chí của chương trình
            return state; //luôn luôn là chữ state
    }
}

export default AuthReducer;