import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: "ajhs4v2t",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-06-25",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
