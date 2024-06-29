import React, { useEffect, useState } from 'react'
import { authNonAxiosInstance, createLinkCategory } from '../helper/util';
import { Link, NavLink } from 'react-router-dom';
import Loading from './Loading';

export default function CatSideBar({ categoryId }) {
    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const getCategories = async () => {
        try {
            console.log(new Date());
            const response = await authNonAxiosInstance().get(`/categories`)
            setCategories(response.data.items)
            setIsLoaded(true)
        }
        catch (error) {
            console.log(error);
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="category">
                <h5>Danh mục sản phẩm</h5>
                <ul>
                    <li>
                        <NavLink to="/san-pham.html" title="Tất cả sản phẩm" target="_self">Tất cả sản phẩm
                        </NavLink>
                    </li>

                    {
                        isLoaded ?
                            categories.map((category, index) =>
                                <li key={index}>
                                    <Link className={categoryId === category.id ? "active" : ""} to={createLinkCategory(category)} title={category.name} target="_self">{category.name}</Link>
                                </li>
                            ) : <Loading />
                    }

                </ul>
            </div></>
    )
}
