import { LoaderFunction } from '@remix-run/node';
import { createSupabaseClient } from 'src/libs/supabase/createClient.server';
import { json, useLoaderData } from 'react-router';
import camelize, { Camelize } from 'camelize-ts';
import { YarnDetail } from 'src/components/detail/yarn/YarnDetail';
import { Tables } from 'src/types/dto';

export const loader = (async ({ request, params }) => {
  const { client, headers } = createSupabaseClient(request);

  const id = Number(params.id);
  if (!id || Number.isNaN(id)) {
    throw new Response('', { status: 404, headers });
  }

  const { data } = await client
    .from('yarns')
    .select('*, yarn_colors ( * )')
    .eq('id', id)
    .single();

  console.log(data);

  if (!data) {
    throw new Response('', { status: 404, headers });
  }

  return json(camelize(data), { headers });
}) satisfies LoaderFunction;

export function ErrorBoundary() {
  return <div>존재하지 않는 데이터입니다</div>;
}

export default function YarnDetailPage() {
  const data = useLoaderData() as Camelize<Tables<'yarns'>> & {
    yarnColors: Camelize<Tables<'yarn_colors'>>[];
  };

  return <YarnDetail yarn={data} colors={data.yarnColors ?? []} />;
}
