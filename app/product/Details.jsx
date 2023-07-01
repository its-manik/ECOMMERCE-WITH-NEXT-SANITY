"use client";
import { client, urlFor } from "@/lib/client";
import React, { useState } from "react";
import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "@/components/Product";

const Details = ({ product, products }) => {

  const { image, name, details, price } = product;

  const {qty, incQty, decQty, onAdd, imgIndex, setImgIndex} = useStateContext()

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              className={`product-detail-image`}
              src={image[imgIndex].asset.url}
              width={400}
              height={400}
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
                key={i}
                src={image[i].asset.url}
                className={
                  i === imgIndex ? "small-image selected-image" : "small-image"
                }
                width={70}
                height={70}
                onMouseEnter={() => setImgIndex(i)}
                alt="preview image"
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={()=> {}}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
