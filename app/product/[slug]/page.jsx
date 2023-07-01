import { client, urlFor } from "@/lib/client";
import Details from "../Details";
async function getProducts(slug) {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0] {
    ...,
        image[] {
          asset->{
            ...,
            metadata
          }
        }
    }`;
  const productsQuery = `*[_type == "product"] {
    ...,
        image[] {
          asset->{
            ...,
            metadata
          }
        }
    }`;
  const product = await client.fetch(productQuery);
  const products = await client.fetch(productsQuery);

  return { product, products };
}

const ProductDetails = async ({ params }) => {
  const { product, products } = await getProducts(params.slug);

  return <Details products={products} product={product} />;
};

export default ProductDetails;
