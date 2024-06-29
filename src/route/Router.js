import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../component/Layout'
import Home from '../Page/Home'
import Product from '../Page/Product'
import PaymentPolicy from '../Page/PaymentPolicy'
import DeliveryPolicy from '../Page/DeliveryPolicy'
import ReturnPolicy from '../Page/ReturnPolicy'
import Contact from '../Page/Contact'
import ProductDetail from '../Page/ProductDetail'
import Account from '../Page/Account'
import ProtectedRouter from './ProtectedRouter'
import Order from '../Page/Order'
import OrderDetail from '../Page/OrderDetail'
import Checkout from '../Page/Checkout'

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='' element={<Home />} />
                <Route path='/san-pham.html' element={<Product />} />
                <Route path='/danh-muc/:slug' element={<Product />} />
                <Route path='/chinh-sach-thanh-toan.html' element={<PaymentPolicy />} />
                <Route path='/chinh-sach-giao-hang.html' element={<DeliveryPolicy />} />
                <Route path='/chinh-sach-doi-tra.html' element={<ReturnPolicy />} />
                <Route path='/lien-he.html' element={<Contact />} />
                <Route path='/san-pham/:slug' element={<ProductDetail />} />
                <Route path='/thong-tin-tai-khoan.html' element={<ProtectedRouter><Account /></ProtectedRouter>} />
                <Route path='/don-hang-cua-toi.html' element={<ProtectedRouter><Order /></ProtectedRouter>} />
                <Route path='/don-hang/:slug.html' element={<ProtectedRouter><OrderDetail /></ProtectedRouter>} />
                <Route path='/checkout' element={<ProtectedRouter><Checkout /></ProtectedRouter>} />
            </Route>
        </Routes >
    )
}
