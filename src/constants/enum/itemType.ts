import { z } from 'zod';

export const itemTypeScheme = z.enum(['yarn', 'needle']);

export const itemTypeList = itemTypeScheme.options;

export type ItemType = z.infer<typeof itemTypeScheme>;

export const ItemTypeToName: Record<ItemType, { kr: string }> = {
  yarn: {
    kr: '실',
  },
  needle: {
    kr: '바늘',
  },
};
