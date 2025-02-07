import { useSearchParams } from '@remix-run/react';
import { useMemo } from 'react';
import { itemTypeScheme } from 'src/constants/enum/itemType';

export const useSelectedItemType = () => {
  const [searchParam] = useSearchParams();
  return useMemo(() => {
    const { success, data } = itemTypeScheme.safeParse(searchParam.get('type'));

    return success ? data : 'yarn';
  }, [searchParam]);
};
