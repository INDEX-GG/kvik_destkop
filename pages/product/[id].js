import { getDataByPost } from "#lib/fetch";
import React from "react";
import ProductPage from "../../src/components/Product/ProductPage";
import ProductProvider from "../../src/context/ProductContext";

const Product = ({ data }) => {
  return (
    <ProductProvider data={data}>
      <ProductPage />
    </ProductProvider>
  );
};
// export async function getStaticProps({ params }) {
//   console.log("!!!!!!!!!!!!!!", params.id);
//   const data = await getDataByPost("/api/getPost", { id: 100635, undefined });
//   return {
//     props: {
//       data,
//     }, // will be passed to the page component as props
//   };
// }

// export async function getStaticPaths() {
//   // Return a list of possible value for id

//   console.log("PATH");

//   return {
//     paths: [{ params: { id: "100635" } }],
//     fallback: false,
//   };
// }

export default Product;
