import { ActionFunction, redirect } from '@remix-run/node';
import { createSupabaseClient } from 'src/libs/supabase/createClient.server';
import { insertNeedleData } from 'src/domains/needle/NeedleRepository.server';
import { insertYarnData } from 'src/domains/yarn/YarnRepository.server';

export const action: ActionFunction = async ({ request, params }) => {
  const type = params.type as 'yarn' | 'needle';
  const { client, headers } = createSupabaseClient(request);

  switch (type) {
    case 'needle': {
      const data = await insertNeedleData(client, await request.formData());

      if (!data) {
        throw new Response('실패', { headers });
      }

      return redirect(`/needle/${data.id}`, {
        headers,
      });
    }
    case 'yarn': {
      const data = await insertYarnData(client, await request.formData());

      if (!data) {
        throw new Response('실패', { headers });
      }

      return redirect(`/yarn/${data.id}`, {
        headers,
      });
    }
  }
};
