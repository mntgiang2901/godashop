import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, UPDATE_QTY } from "../const/CartConstant";
import { pre_add_to_cart, pre_remove_to_cart, pre_update_cart } from "../helper/util";

const cart = localStorage.getItem("cart");
let initialState;
if (!cart) {
    initialState = {
        cartItems: []
    }
}
else {
    // Chuyển ngược lại từ chuỗi sang object
    initialState = JSON.parse(cart);
}

// state lưu 3 thông tin: isLogin, access_token, loggedUser
// isLogin để biết rằng đã login vào hệ thống chưa
// access_token để lấy thông tin (student, register, subject)
// loggedUser để hiển thị thông tin người đăng nhập lên trang web
// current state + action = new state
const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            { //chưa tối ưu, cần xử lý sau
                const newCart = {
                    cartItems: pre_add_to_cart(state.cartItems, action.payload)
                }
                //Lưu xướng localStorage của trình duyệt để lần sau mở web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart))
                return newCart;
            }
        case REMOVE_FROM_CART:
            {//chưa tối ưu, cần xử lý sau
                const newCart = {
                    cartItems: pre_remove_to_cart(state.cartItems, action.payload.id)
                }
                //Lưu xướng localStorage của trình duyệt để lần sau mở web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart))
                return newCart;
            }
        case UPDATE_QTY:
            {
                const newCart = {
                    cartItems: pre_update_cart(state.cartItems, action.payload)
                }
                //Lưu xướng localStorage của trình duyệt để lần sau mở web lên nó vẫn còn giỏ hàng
                localStorage.setItem('cart', JSON.stringify(newCart));
                return newCart;
            }
        case EMPTY_CART:
            {
                const newCart = {
                    cartItems: []
                }
                //Lưu xướng localStorage của trình duyệt để lần sau mở web lên nó vẫn còn giỏ hàng
                localStorage.removeItem('cart')
                return newCart;
            }
        default:
            //giữ nguyên state hiện tại nếu không có action nào phù hợp với tiêu chí của chương trình
            return state; //luôn luôn là chữ state
    }
}

export default CartReducer;