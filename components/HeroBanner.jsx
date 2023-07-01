'use client'
import Link from "next/link";
import React from "react";
import { urlFor } from "@/lib/client";
import Image from "next/image";


const HeroBanner = ({heroBanner}) => {
    const {
      buttonText,
      desc, discount, largeText1, largeText2, midText, product, saleTime, smallText, image
    } = heroBanner

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <Image src={image.asset.url} className="hero-banner-image" alt="headphones"
        width={450}
        height={450}
        />
        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
