import { useSession } from "next-auth/react";
import { AuthApi, Configuration } from "apis-coffeedash";

const { data } = useSession()

const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BACKEND_SERVICE_HOSTNAME, // initial base path
  apiKey: process.env.BACKEND_SERVICE_API_KEY, // initial API key
  accessToken: data?.accessToken
});

export const authApiClient = new AuthApi(configuration);