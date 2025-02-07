import { useSearchParams } from '@remix-run/react';
import { ChangeEvent } from 'react';
import {
  itemTypeList,
  itemTypeScheme,
  ItemTypeToName,
} from 'src/constants/enum/itemType';

export const SelectItemType = () => {
  const [, setSearchParams] = useSearchParams();
  const handleSelectType = (e: ChangeEvent<HTMLSelectElement>) => {
    const { success, data } = itemTypeScheme.safeParse(e.target.value);
    if (!success) return;

    setSearchParams(
      (prev) => {
        prev.set('type', data);
        return prev;
      },
      { preventScrollReset: false },
    );
  };

  return (
    <select name="type" onChange={handleSelectType}>
      {itemTypeList.map((t) => (
        <option key={t} value={t}>
          {ItemTypeToName[t].kr}
        </option>
      ))}
    </select>
  );
};
