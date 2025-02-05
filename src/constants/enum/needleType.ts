import { z } from 'zod';

export const NeedleTypeScheme = z.enum(['crochet', 'knit', 'lace', 'tapestry']);

export type NeedleType = z.infer<typeof NeedleTypeScheme>;

export const NeedleTypeToName: Record<NeedleType, { kr: string }> = {
  crochet: {
    kr: '코바늘',
  },
  knit: {
    kr: '대바늘',
  },
  lace: {
    kr: '레이스 바늘',
  },
  tapestry: {
    kr: '돗바늘',
  },
};
