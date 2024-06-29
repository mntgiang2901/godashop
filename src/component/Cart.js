import React from 'react'
import { POPUP_CART, POPUP_CLOSE } from '../const/PopupConstant';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createLinkProduct, formatMoney } from '../helper/util';
import { REMOVE_FROM_CART, UPDATE_QTY } from '../const/CartConstant';

export default function Cart() {
    const navigate = useNavigate()
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const totalPrice = cartItems.reduce((total, item) => total + Number(item.sale_price * item.qty), 0);
    const popup_type = useSelector(state => state.PopupReducer.popup_type)
    console.log(popup_type);
    const fade = popup_type === POPUP_CART ? '' : 'fade';
    const display = popup_type === POPUP_CART ? 'block' : 'none'
    const dispatch = useDispatch();
    const handleClosePopup = () => {
        const action = { type: POPUP_CLOSE }
        dispatch(action)
    }
    const handleRemoveProductOutCart = (id) => {
        const action = { type: REMOVE_FROM_CART, payload: { id: id } }
        dispatch(action)
    }
    const handleUpdateQty = (id, qty) => {
        const action = { type: UPDATE_QTY, payload: { id: id, qty: qty } }
        dispatch(action)
    }
    const handleContinuteShop = (e) => {
        e.preventDefault()
        // Tắt POPUP
        const action = { type: POPUP_CLOSE }
        dispatch(action)
        // Về trang sản phẩm
        navigate("/san-pham.html")
    }

    const handleOrder = (e) => {
        e.preventDefault()
        // Tắt POPUP
        const action = { type: POPUP_CLOSE }
        dispatch(action)
        // Về trang checkout
        navigate("/checkout")
    }

    return (
        <div>
            <div className={'modal ' + fade} id="modal-cart-detail" style={{ display: display }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-color">
                            <button type="button" onClick={() => handleClosePopup()} className="close" data-dismiss="modal" aria-hidden="true">x</button>
                            <h3 className="modal-title text-center">Giỏ hàng</h3>
                        </div>
                        <div className="modal-body">
                            <div className="page-content">
                                <div className="clearfix hidden-sm hidden-xs">
                                    <div className="col-xs-1">
                                    </div>
                                    <div className="col-xs-3">
                                        <div className="header">
                                            Sản phẩm
                                        </div>
                                    </div>
                                    <div className="col-xs-2">
                                        <div className="header">
                                            Đơn giá
                                        </div>
                                    </div>
                                    <div className="label_item col-xs-3">
                                        <div className="header">
                                            Số lượng
                                        </div>
                                    </div>
                                    <div className="col-xs-2">
                                        <div className="header">
                                            Thành tiền
                                        </div>
                                    </div>
                                    <div className="lcol-xs-1">
                                    </div>
                                </div>
                                <div className="cart-product">
                                    {
                                        cartItems.map((item) =>
                                            <>
                                                <hr />
                                                <div className="clearfix text-left">
                                                    <div className="row">
                                                        <div className="col-sm-6 col-md-1">
                                                            <div><img className="img-responsive" src={item.featured_image} alt="Kem làm trắng da 5 trong 1 Beaumore Secret Whitening Cream " /></div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-3"><Link className="product-name" to={createLinkProduct(item)}>{item.name}</Link></div>
                                                        <div className="col-sm-6 col-md-2"><span className="product-item-discount">{formatMoney(item.sale_price)}₫</span></div>
                                                        <div className="col-sm-6 col-md-3"><input type="number" onChange={(e) => handleUpdateQty(item.id, e.target.value)} min={1} value={item.qty} /></div>
                                                        <div className="col-sm-6 col-md-2"><span>{formatMoney(item.sale_price * item.qty)}₫</span></div>
                                                        <div className="col-sm-6 col-md-1"><Link className="remove-product" to="#" onClick={() => handleRemoveProductOutCart(item.id)}><span className="glyphicon glyphicon-trash" /></Link></div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="clearfix">
                                    <div className="col-xs-12 text-right">
                                        <p>
                                            <span>Tổng tiền</span>
                                            <span className="price-total">{formatMoney(totalPrice)}₫</span>
                                        </p>
                                        <Link to="#" name="back-shopping" onClick={(e) => handleContinuteShop(e)} className="btn btn-default">Tiếp tục mua sắm</Link>
                                        <Link to="#" name="checkout" onClick={(e) => handleOrder(e)} className="btn btn-primary" >Đặt hàng</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
