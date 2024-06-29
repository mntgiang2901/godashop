import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { POPUP_CLOSE, POPUP_FORGOT_PASS, POPUP_LOGIN } from '../const/PopupConstant';

import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { authNonAxiosInstance } from '../helper/util';
import { LOGIN } from '../const/AuthConstant';

export default function LoginForm() {
    const navigate = useNavigate();
    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            email: "",
            password: "",
        },
        //Kiểm tra dữ liệu
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Vui lòng nhập password"),
            email: Yup.string()
                .required("Vui lòng nhập email"),
        }),
        //khi dữ liệu hợp sẽ chạy code của onSubmit
        onSubmit: async values => {
            //alert(values);
            //Đóng popup
            handleClosePopup();
            // call api để lấy data đăng nhập
            try {
                const response = await authNonAxiosInstance().post(`/login`, JSON.stringify(values));
                const data = response.data;
                console.log(data);
                // toast.success("Đăng nhập thành công!")
                // dispatch action bao gồm access token và thông tin users lên store
                const action = {
                    type: LOGIN,
                    payload: {
                        access_token: data.access_token,
                        loggedUser: data.user
                    }
                }
                dispatch(action)
                //Sau khi login sẽ điều hướng về trang thông tin tài khoản
                navigate("/thong-tin-tai-khoan.html")
            }
            catch (error) {
                console.log(error);
                toast.error(error?.response?.data || error.message)
            }
        },
    });

    const popup_type = useSelector(state => state.PopupReducer.popup_type)
    console.log(popup_type);
    const fade = popup_type === POPUP_LOGIN ? '' : 'fade';
    const display = popup_type === POPUP_LOGIN ? 'block' : 'none'
    const dispatch = useDispatch();
    const handleClosePopup = () => {
        const action = { type: POPUP_CLOSE }
        dispatch(action)
    }

    const handlePopupForgotPassword = () => {
        const action = { type: POPUP_FORGOT_PASS }
        dispatch(action)
    }


    return (
        <div>
            <div className={'modal ' + fade} id="modal-login" role="dialog" style={{ display: display }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-color">
                            <button type="button" onClick={() => handleClosePopup()} className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h3 className="modal-title text-center">Đăng nhập</h3>
                            {/* Google login */}
                            <br />
                            <div className="text-center">
                                <Link className="btn btn-primary google-login" to="#"><i className="fab fa-google" /> Đăng nhập bằng Google</Link>
                                {/* Facebook login */}
                                <Link className="btn btn-primary facebook-login" to="#"><i className="fab fa-facebook-f" /> Đăng nhập bằng Facebook</Link>
                            </div>
                        </div>
                        <form action="#" method="POST" onSubmit={formik.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ?
                                        <div className="text-danger">{formik.errors.email}</div>
                                        : null}
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" className="form-control" placeholder="Mật khẩu" onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password ?
                                        <div className="text-danger">{formik.errors.password}</div>
                                        : null}
                                </div>
                                <input type="hidden" name="reference" defaultValue />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Đăng Nhập</button><br />
                                <div className="text-left">
                                    <Link to="#" className="btn-register">Bạn chưa là thành viên? Đăng kí ngay!</Link>
                                    <Link to="#" onClick={() => handlePopupForgotPassword()} className="btn-forgot-password">Quên Mật Khẩu?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
