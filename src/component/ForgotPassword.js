import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, POPUP_FORGOT_PASS } from '../const/PopupConstant';

export default function ForgotPassword() {
    const popup_type = useSelector(state => state.PopupReducer.popup_type)
    console.log(popup_type);
    const fade = popup_type === POPUP_FORGOT_PASS ? '' : 'fade';
    const display = popup_type === POPUP_FORGOT_PASS ? 'block' : 'none'
    const dispatch = useDispatch();
    const handleClosePopup = () => {
        const action = { type: POPUP_CLOSE }
        dispatch(action)
    }
    return (
        <div>
            <div className={'modal ' + fade} id="modal-forgot-password" style={{ display: display }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-color">
                            <button type="button" onClick={() => handleClosePopup()} className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h3 className="modal-title text-center">Quên mật khẩu</h3>
                        </div>
                        <form action="#" method="POST">
                            <div className="modal-body">
                                <div className="form-group">
                                    <input name="email" type="email" className="form-control" placeholder="Email" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="hidden" name="reference" defaultValue />
                                <button type="submit" className="btn btn-primary">GỬI</button><br />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
