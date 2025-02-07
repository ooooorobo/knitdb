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
import styles from './global.css?url';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    crossOrigin: 'anonymous',
    as: 'style',
    href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { client, headers } = createSupabaseClient(request);

  const { data } = await client.auth.getSession();

  if (new URL(request.url).pathname !== '/login' && !data.session) {
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
      <body
        className={'bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100'}
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={'/'}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  뜨개디비
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
            <Link to={'/item/new'}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                추가
              </NavigationMenuLink>
            </Link>
            <Link to={'/logout'}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                로그아웃
              </NavigationMenuLink>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <div className={'mx-auto w-full max-w-screen-lg'}>{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
