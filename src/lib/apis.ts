import { AuthApi, CartApi, Configuration, ProductsApi } from "apis-coffeedash";

const configuration = new Configuration({
  apiKey: process.env.API_KEY, // initial API key
  basePath: process.env.NEXT_PUBLIC_BACKEND_SERVICE, // initial base path
});

export const authApiClient = new AuthApi(configuration);
export let cartApiClient = new CartApi(configuration);
export let productApiClient = new ProductsApi(configuration);

export const setAccessToken = (accessToken: string) => {
  const newConfiguration = new Configuration({
    basePath: process.env.NEXT_PUBLIC_BACKEND_SERVICE,
    apiKey: process.env.API_KEY,
    accessToken: accessToken
  });

  cartApiClient = new CartApi(newConfiguration);
  productApiClient = new ProductsApi(newConfiguration);
};