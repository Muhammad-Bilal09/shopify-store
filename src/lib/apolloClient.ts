import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const SHOPIFY_DOMAIN_NAME = "shelfmart.myshopify.com";
const SHOPIFY_ACCESS_TOKEN = "4f1cd9085565905eaefa9de7ed89b0cc";

if (!SHOPIFY_DOMAIN_NAME || !SHOPIFY_ACCESS_TOKEN) {
  throw new Error(
    "Missing Shopify API URL or Access Token in environment variables"
  );
}

// Construct the Shopify API URL
const SHOPIFY_API_URL = `https://${SHOPIFY_DOMAIN_NAME}/api/2023-01/graphql.json`;

const httpLink = new HttpLink({
  uri: SHOPIFY_API_URL,
  headers: {
    "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const SHOPIFY_API_URL = "shelfmart.myshopify.com";
// const SHOPIFY_ACCESS_TOKEN = "4f1cd9085565905eaefa9de7ed89b0cc";

// console.log("SHOPIFY_API_URL:", process.env.SHOPIFY_DOMAIN_NAME);
// console.log("SHOPIFY_ACCESS_TOKEN:", process.env.SHOPIFY_ACCESS_TOKEN);

// if (!SHOPIFY_API_URL || !SHOPIFY_ACCESS_TOKEN) {
//   throw new Error(
//     "Missing Shopify API URL or Access Token in environment variables"
//   );
// }

// const httpLink = new HttpLink({
//   uri: SHOPIFY_API_URL,
//   headers: {
//     "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
//     "Content-Type": "application/json",
//   },
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

// export default client;
