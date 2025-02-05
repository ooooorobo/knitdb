import { LoaderFunction } from '@remix-run/node';
import { createSupabaseClient } from 'src/libs/supabase/createClient.server';
import { useLoaderData } from 'react-router';
import camelize, { Camelize } from 'camelize-ts';
import { Tables } from 'src/types/dto';
import { NeedleDetail } from 'src/components/detail/needle/NeedleDetail';

export const loader = (async ({ request, params }) => {
  const { client, headers } = createSupabaseClient(request);

  const id = Number(params.id);
  if (!id || Number.isNaN(id)) {
    throw new Response('', { status: 404, headers });
  }

  const { data } = await client
    .from('needles')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    throw new Response('', { status: 404, headers });
  }

  return Response.json(camelize(data), { headers });
}) satisfies LoaderFunction;

export function ErrorBoundary() {
  return <div>존재하지 않는 데이터입니다</div>;
}

export default function NeedleDetailPage() {
  const data = useLoaderData<typeof loader>() as Camelize<Tables<'needles'>>;

  return <NeedleDetail needle={data} />;
}
