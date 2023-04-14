import {
  type LinksFunction,
  type MetaFunction,
  type LoaderArgs,
} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type {
  Shop,
  Menu,
  Collection,
} from '@shopify/hydrogen/storefront-api-types';
import styles from './styles/tailwind-build.css';
import favicon from '../public/snow-devil-logo.svg';
import Header from './components/Header';
import {CurrencySelectorProvider} from './context/CurrencySelector';

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
  ];
};

export const meta: MetaFunction<typeof loader> = ({
  data: {
    layout: {
      shop: {name},
    },
  },
}) => ({
  title: name,
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader({context}: LoaderArgs) {
  const layout = await context.storefront.query<{
    shop: Shop;
    menu: Menu;
    collections: {
      nodes: {
        title: Collection['title'];
        image: Collection['image'];
      }[];
    };
  }>(LAYOUT_QUERY);
  return {layout};
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <CurrencySelectorProvider>
          <Header />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </CurrencySelectorProvider>
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
      primaryDomain{
        url
      }
    }
    menu(handle: "main-menu"){
      items {
        title
        url
        items {
          title
          url
        }
      }
    }
    collections(first: 250){
      nodes{
        title
        image{
          url
          height
          width
        } 
      }
    }
  }
`;
