import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'src/types/dto';
import { zfd } from 'zod-form-data';
import { ResponseError } from 'src/types/error';
import { z } from 'zod';

const yarnFormScheme = zfd.formData({
  name: zfd.text(),
  priceAmount: zfd.numeric(z.number().max(10_000_000).optional()),
  thickness: zfd.numeric(z.number().max(1000)),
  weight: zfd.numeric(z.number().max(1000)),
  composition: zfd.text(z.string().optional()).optional(),
  url: zfd.text(z.string().url().optional()),
  needleInfo: zfd.text(z.string().optional()).optional(),
  colorValue: zfd.repeatable(z.string().array()),
  colorName: zfd.repeatable(z.string().array()),
  memo: zfd.text(z.string().max(5000).optional()),
});

export const insertYarnData = async (
  client: SupabaseClient<Database>,
  form: FormData,
) => {
  const data = yarnFormScheme.parse(form);

  const {
    data: { user },
    error: userError,
  } = await client.auth.getUser();

  if (!user || userError) {
    throw new ResponseError('NOT_AUTHENTICATED');
  }

  const { data: resultData, error } = await client
    .from('yarns')
    .insert({
      name: data.name,
      price_amount: data.priceAmount,
      price_currency: 'KRW',
      thickness: data.thickness,
      weight: data.weight,
      composition: data.composition,
      url: data.url,
      needle_info: data.needleInfo,
      memo: data.memo,
      creator_id: user.id,
    })
    .select('id')
    .single();

  if (!resultData || error) {
    console.log(error);
    throw new ResponseError('DATA_INSERT_FAILED');
  }

  const colors = data.colorValue.map((value, idx) => ({
    color: value,
    name: data.colorName[idx] ?? '',
  }));

  for (const color of colors) {
    await client.from('yarn_colors').insert({
      color: color.color,
      name: color.name,
      creator_id: user.id,
      yarn_id: resultData.id,
    });
  }

  return resultData;
};
