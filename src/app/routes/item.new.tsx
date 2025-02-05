import { ActionFunction, redirect } from '@remix-run/node';
import { createSupabaseClient } from 'src/libs/supabase/createClient.server';
import { NeedleForm } from 'src/components/form/needle/NeedleForm';
import { insertNeedleData } from 'src/domains/needle/NeedleRepository.server';

export const action: ActionFunction = async ({ request }) => {
  const { client, headers } = createSupabaseClient(request);

  const data = await insertNeedleData(client, await request.formData());

  if (!data) {
    throw new Response('실패', { headers });
  }

  return redirect(`/needle/${data.id}`, {
    headers,
  });
};

export default function ItemCreatePage() {
  return <NeedleForm />;
}
