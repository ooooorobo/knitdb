import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { createSupabaseClient } from 'src/libs/supabase/createClient.server';
import { json, useLoaderData } from 'react-router';
import { NeedleCard } from 'src/components/list/needle/NeedleCard';
import camelize, { Camelize } from 'camelize-ts';
import { Tables } from 'src/types/dto';
import { Link } from '@remix-run/react';
import { useState } from 'react';
import {
  ItemType,
  itemTypeList,
  ItemTypeToName,
} from 'src/constants/enum/itemType';
import { match } from 'ts-pattern';
import { YarnCard } from 'src/components/list/yarn/YarnCard';

export const meta: MetaFunction = () => {
  return [{ title: '뜨개디비' }, { name: 'description', content: '' }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { client, headers } = createSupabaseClient(request);

  // TODO: 페이지네이션, api 분리
  const { data } = await client
    .from('users')
    .select('needles (*), yarns (*, yarn_colors (*))');

  if (!data) throw new Response('', { status: 404 });

  return json(camelize(data[0]), { headers });
};

export default function Index() {
  const { needles, yarns } = useLoaderData() as {
    needles: Camelize<Tables<'needles'>>[];
    yarns: (Camelize<Tables<'yarns'>> & {
      yarnColors: Camelize<Tables<'yarn_colors'>>[];
    })[];
  };
  const [type, setType] = useState<ItemType>('yarn');

  return (
    <>
      <select name="type" onChange={(e) => setType(e.target.value as ItemType)}>
        {itemTypeList.map((t) => (
          <option key={t} value={t}>
            {ItemTypeToName[t].kr}
          </option>
        ))}
      </select>
      {match(type)
        .with('needle', () => (
          <div>
            {needles.map((needle) => (
              <Link key={needle.id} to={`/needle/${needle.id}`}>
                <NeedleCard needle={needle} />
              </Link>
            ))}
          </div>
        ))
        .with('yarn', () => (
          <div>
            {yarns.map((yarn) => (
              <Link key={yarn.id} to={`/yarn/${yarn.id}`}>
                <YarnCard yarn={yarn} colors={yarn.yarnColors ?? []} />
              </Link>
            ))}
          </div>
        ))
        .exhaustive()}
    </>
  );
}
