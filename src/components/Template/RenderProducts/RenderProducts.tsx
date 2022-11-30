import { Box, Grid, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getProduct } from "../../../services/productService/ProductService";
import LocalStorage from "../../../utils/LocalStorage";
import Product from "../../Atom/Product/Product";

type TypeCart = {
  productId: string;
  quantity: number;
};
type TypeProps = {
  xs: number;
};
const RenderProducts = ({ xs }: TypeProps) => {
  const [cart, setCart] = useState<TypeCart[]>(
    () => LocalStorage.get("cart") || []
  );
  const { isLoading, error, data, refetch } = useQuery(
    "repoData",
    () => getProduct(),
    {
      staleTime: 6000,
    }
  );
  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>An error has occurred: </p>;
  return (
    <>
      <Grid container spacing={4} width="100%">
        {data &&
          data.data.map((item: any) => {
            return (
              <Grid item xs={xs} key={item._id}>
                <Product
                  setCart={setCart}
                  image={item.images[0]}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                />
              </Grid>
            );
          })}
      </Grid>
     <Box display="flex" justifyContent="center" my={5}>
        <Stack spacing={2}>
          <Pagination count={10}   variant="outlined" color="primary"/>
        </Stack>
     </Box>
    </>
  );
};

export default RenderProducts;
