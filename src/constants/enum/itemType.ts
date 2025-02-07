export const itemTypeList = ['yarn', 'needle'] as const;

export type ItemType = (typeof itemTypeList)[number];

export const ItemTypeToName: Record<ItemType, { kr: string }> = {
  yarn: {
    kr: '실',
  },
  needle: {
    kr: '바늘',
  },
};
