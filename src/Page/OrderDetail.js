import React, { useEffect, useState } from 'react'
import SidebarAccount from '../component/SidebarAccount'
import { authAxiosInstance, createLinkProduct, formatMoney, getOrderId } from '../helper/util';
import Loading from '../component/Loading';
import { Link, useParams } from 'react-router-dom';

export default function OrderDetail() {
    const [order, setOrder] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { slug } = useParams();
    const orderId = getOrderId(slug);

    const getOrder = async () => {
        setIsLoaded(false); //reset lai truoc khi call api
        try {
            console.log(new Date());
            const response = await authAxiosInstance().get(`/orders/${orderId}`)
            setOrder(response.data)
            setIsLoaded(true)
        }
        catch (error) {
            console.log(error);
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getOrder();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><Link to="/" target="_self">Trang chủ</Link></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Tài khoản</span></li>
                            </ol>
                        </div>
                        <div className="clearfix" />
                        <SidebarAccount />
                        <div className="col-md-9 order-info">
                            {
                                isLoaded ?
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <h4 className="home-title">Đơn hàng #{order.id}</h4>
                                        </div>
                                        <aside className="col-md-7 cart-checkout">
                                            {
                                                order.order_items.map((order_item) =>
                                                    <>
                                                        <div className="row">
                                                            <div className="col-xs-2">
                                                                <img className="img-responsive" src={order_item.product.featured_image} alt={order_item.product.name} />
                                                            </div>
                                                            <div className="col-xs-7">
                                                                <a className="product-name" href={createLinkProduct(order_item.product)}>{order_item.product.name}</a>
                                                                <br />
                                                                <span>{order_item.qty}</span> x <span>{formatMoney(order_item.unit_price)}₫</span>
                                                            </div>
                                                            <div className="col-xs-3 text-right">
                                                                <span>{formatMoney(order_item.total_price)}₫</span>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </>
                                                )
                                            }


                                            <hr />
                                            <div className="row">
                                                <div className="col-xs-6">
                                                    Tạm tính
                                                </div>
                                                <div className="col-xs-6 text-right">
                                                    {
                                                        formatMoney(order.order_items.reduce((sub_total, order_item) => sub_total + Number(order_item.total_price), 0))
                                                    }₫
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6">
                                                    Phí vận chuyển
                                                </div>
                                                <div className="col-xs-6 text-right">
                                                    {formatMoney(order.shipping_fee)}₫
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-xs-6">
                                                    Tổng cộng
                                                </div>
                                                <div className="col-xs-6 text-right">
                                                    {
                                                        formatMoney(order.order_items.reduce((sub_total, order_item) => sub_total + Number(order_item.total_price), 0) + Number(order.shipping_fee))
                                                    }₫
                                                </div>
                                            </div>
                                        </aside>
                                        <div className="ship-checkout col-md-5">
                                            <h4>Thông tin giao hàng</h4>
                                            <div>
                                                Họ và tên: {order.shipping_name}
                                            </div>
                                            <div>
                                                Số điện thoại: {order.shipping_mobile}
                                            </div>
                                            <div>
                                                {order.province_name}
                                            </div>
                                            <div>
                                                {order.district_name}
                                            </div>
                                            <div>
                                                {order.ward_name}
                                            </div>
                                            <div>
                                                {order.shipping_housenumber_street}
                                            </div>
                                            <div>
                                                Phương thức thanh toán: {order.payment_method === 0 ? 'COD' : 'Bank'}
                                            </div>
                                        </div>
                                    </div> : <Loading />
                            }
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}
