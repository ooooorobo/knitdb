import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { LinksFunction, LoaderFunction, redirect } from '@remix-run/node';
import { createSupabaseClient } from 'src/libs/supabase/createClient.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://matcha.mizu.sh/matcha.css' },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { client, headers } = createSupabaseClient(request);

  const session = client.auth.getSession();

  if (!session) {
    throw redirect('/login', { headers });
  }

  return new Response('', { headers });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Link to={'/'}>뜨개디비</Link>
          <Link to={'/item/new'}>추가</Link>
          <Link to={'/logout'}>로그아웃</Link>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
