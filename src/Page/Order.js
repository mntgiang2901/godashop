import React, { useEffect, useState } from 'react'
import SidebarAccount from '../component/SidebarAccount'

import { authAxiosInstance } from '../helper/util';
import Loading from '../component/Loading';
import OrderList from '../component/OrderList';

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const getOrders = async () => {
        setIsLoaded(false); //reset lai truoc khi call api
        try {
            console.log(new Date());
            const response = await authAxiosInstance().get(`/orders`)
            setOrders(response.data)
            setIsLoaded(true)
        }
        catch (error) {
            console.log(error);
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Trang chủ</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Tài khoản</span></li>
                            </ol>
                        </div>
                        <div className="clearfix" />
                        <SidebarAccount />
                        <div className="col-md-9 order">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h4 className="home-title">Đơn hàng của tôi</h4>
                                </div>
                                <div className="clearfix" />
                                <div className="col-md-12">
                                    {/* Mỗi đơn hàng */}
                                    {
                                        isLoaded ? <OrderList orders={orders} /> : <Loading />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}
