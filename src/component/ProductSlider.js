import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductSlider({ product }) {
    const images = [
        {
            //big
            original: product.featured_image,

            //small
            thumbnail: product.featured_image,
        }
    ];

    // Dấu ({}) để phân biệt object với thân hàm
    const moreImage = product.thumbnailItems.map((thumbnailItem) => (
        {
            //big
            original: thumbnailItem.name,

            //small
            thumbnail: thumbnailItem.name,
        }
    ))

    const allImage = [...images, ...moreImage]
    return <ImageGallery items={allImage} showNav={false} showPlayButton={false} />;
}
