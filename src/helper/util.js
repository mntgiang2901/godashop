import axios from "axios";
import slugify from "react-slugify";
import numeral from 'numeral';
import 'numeral/locales';
numeral.locale('vi');

export const updateParam = (searchParams, setSearchParams, newParams) => {
    // for...of...
    // lấy tất cả params ra, rồi cập nhật cho mỗi thằng search
    // sau đó dùng hàm setSearchParams() để cập nhật đường dẫn lên web
    let params = {};
    for (const [key, value] of searchParams.entries()) {
        // key là tên param, value là giá trị của param đó
        // vdu: page=2&search=ty thì tên param là page, gtri là 2
        params[key] = value;
    }
    params = { ...params, ...newParams }
    setSearchParams(params);
}

export const getAuthInfo = () => {
    const authInfo = localStorage.getItem("authInfo");
    let initialState;
    if (!authInfo) {
        initialState = { isLogin: false, access_token: null, loggedUser: null }
    }
    else {
        // Chuyển ngược lại từ chuỗi sang object
        initialState = JSON.parse(authInfo);
    }
    return initialState
}

export const authAxiosInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `Bearer ${getAuthInfo().access_token}`
    }
})

export const authNonAxiosInstance = () => axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const getCategoryId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('-'); //cắt chuỗi ở dấu ngoặc
    //Id nằm ở phần tử cuối
    // const categoryId = slugParts[slugParts.length - 1];
    const categoryId = slugParts.pop();
    return categoryId;
}

export const getProductId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('.html'); //cắt chuỗi ở cuối cùng
    //Id nằm ở phần tử cuối
    const leftPart = slugParts[0];
    // cắt ở dấu ('-')
    const parts = leftPart.split('-');
    // const categoryId = slugParts[slugParts.length - 1];
    const productId = parts.pop();
    return productId;
}

export const createLinkCategory = (category) => {
    return `/danh-muc/${slugify(category.name + '-' + category.id)}`
}

// san-pham/kem-lam-trang-da-5-in-1-2870.html
export const createLinkProduct = (product) => {
    return `/san-pham/${slugify(product.name + '-' + product.id)}.html`;
}

// /don-hang/chi-tiet-don-hang-5.html
export const createLinkOrderDetail = (order) => {
    return `/don-hang/chi-tiet-don-hang-${order.id}.html`;
}

export const formatMoney = (money) => {
    return numeral(money).format('0,0');
}

export const getOrderId = (slug) => {
    if (!slug) return '';
    const slugParts = slug.split('.html'); //cắt chuỗi ở cuối cùng
    //Id nằm ở phần tử cuối
    const leftPart = slugParts[0];
    // cắt ở dấu ('-')
    const parts = leftPart.split('-');
    // const categoryId = slugParts[slugParts.length - 1];
    const orderId = parts.pop();
    return orderId;
}

export const pre_add_to_cart = (arr, input) => {
    //Giú tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))
    //Kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // Nếu không trùng, trả về giá trị -1
    const index = newArray.findIndex((item) => item.id === input.id)
    if (index !== -1) {
        newArray[index].qty += Number(input.qty);
    }
    else {
        newArray.push(input);
    }
    return newArray;
}

export const pre_remove_to_cart = (arr, id) => {
    //Giú tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))
    //Kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // Nếu không trùng, trả về giá trị -1
    const index = newArray.findIndex((item) => item.id === id)
    if (index !== -1) {
        newArray.splice(index, 1);
    }

    return newArray;
}

export const pre_update_cart = (arr, input) => {
    //Giú tăng tốc tính toán, không ảnh hưởng đến state trước
    const newArray = JSON.parse(JSON.stringify(arr))
    //Kiểm tra xem có bị trùng không, và trả về chỉ số của phần tử bị trùng
    // Nếu không trùng, trả về giá trị -1
    const index = newArray.findIndex((item) => item.id === input.id)
    if (index !== -1) {
        newArray[index].qty = Number(input.qty);
    }
    else {
        newArray.push(input);
    }
    return newArray;
}

