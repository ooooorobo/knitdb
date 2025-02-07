import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { createSupabaseClient } from 'src/libs/supabase/createClient.server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { LoginForm } from '~/components/login-form';

const loginFormScheme = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(8)),
});

export const action: ActionFunction = async ({ request }) => {
  const { client, headers } = createSupabaseClient(request);

  const body = loginFormScheme.parse(await request.formData());

  const { error } = await client.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  if (error) {
    return new Response(JSON.stringify({ message: '로그인 실패' }), {
      headers,
    });
  }

  return redirect('/', {
    headers,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const { client, headers } = createSupabaseClient(request);

  try {
    const { data } = await client.auth.getSession();

    if (data.session) {
      return redirect('/', { headers });
    }
  } catch (e) {
    return new Response('', { headers });
  }

  return new Response('', { headers });
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
