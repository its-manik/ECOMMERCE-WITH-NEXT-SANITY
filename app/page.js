import { Product, FooterBanner, HeroBanner } from "@/components"
import { client } from "@/lib/client"
import { groq } from "next-sanity";


async function getData() {
  const productQuery = groq`*[_type == "product"] {
    ...,
    image[] {
      asset-> {
        ..., 
        metadata
      }
    }
  }`;
const productData = await client.fetch(productQuery);

const bannerQuery = `*[_type == "banner"] {
  ...,
    image {
      asset->{
        ...,
        metadata
      }
    },
  }
`;
const bannerData = await client.fetch(bannerQuery);

return {productData, bannerData}
}



export default async function Home() {
  const {productData, bannerData} = await getData()
  return (
    <>
<HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>Speader there are many variations passages</p>
    </div>

    <div className="products-container">
      {productData.map(product => <Product key={product.id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}
