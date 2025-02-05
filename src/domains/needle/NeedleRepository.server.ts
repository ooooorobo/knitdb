import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { NeedleTypeScheme } from 'src/constants/enum/needleType';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'src/types/dto';
import { ResponseError } from 'src/types/error';

const needleFormScheme = zfd.formData({
  name: zfd.text(z.string()),
  type: zfd.text(NeedleTypeScheme),
  width: zfd.numeric(z.number().max(1000)),
  priceAmount: zfd.numeric(z.number().max(10_000_000).optional()),
  url: zfd.text(z.string().url().optional()),
  memo: zfd.text(z.string().max(5000).optional()),
});

export const insertNeedleData = async (
  client: SupabaseClient<Database>,
  form: FormData,
) => {
  const data = needleFormScheme.parse(form);

  const {
    data: { user },
    error: userError,
  } = await client.auth.getUser();

  if (!user || userError) {
    throw new ResponseError('NOT_AUTHENTICATED');
  }

  const { data: resultData, error } = await client
    .from('needles')
    .insert({
      name: data.name,
      type: data.type,
      width: data.width,
      price_amount: data.priceAmount,
      url: data.url,
      memo: data.memo,
      creator_id: user.id,
    })
    .select('id')
    .single();

  if (!resultData || error) {
    throw new ResponseError('DATA_INSERT_FAILED');
  }

  return resultData;
};
