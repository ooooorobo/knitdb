import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'src/types/dto';

export const createSupabaseClient = (
  request: Request,
): {
  client: SupabaseClient<Database>;
  headers: Headers;
} => {
  const headers = new Headers();

  const client = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              'Set-Cookie',
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );

  return { client, headers };
};
