import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { createSupabaseClient } from 'src/libs/supabase/createClient.server';
import { useLoaderData } from 'react-router';
import { NeedleCard } from 'src/components/list/needle/NeedleCard';
import { Camelize } from 'camelize-ts';
import { Tables } from 'src/types/dto';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: '뜨개디비' }, { name: 'description', content: '' }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { client, headers } = createSupabaseClient(request);

  const { data } = await client.from('users').select('needles (*)');

  if (!data) throw new Response('', { status: 404 });

  return Response.json(data[0].needles, { headers });
};

export default function Index() {
  const needles = useLoaderData() as Camelize<Tables<'needles'>>[];

  return (
    <div>
      {needles.map((needle) => (
        <Link key={needle.id} to={`/needle/${needle.id}`}>
          <NeedleCard needle={needle} />
        </Link>
      ))}
    </div>
  );
}
