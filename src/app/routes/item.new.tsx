import { NeedleForm } from 'src/components/form/needle/NeedleForm';
import { useState } from 'react';
import { match } from 'ts-pattern';
import { YarnForm } from 'src/components/form/yarn/YarnForm';
import {
  ItemType,
  itemTypeList,
  ItemTypeToName,
} from 'src/constants/enum/itemType';

export default function ItemCreatePage() {
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
      {match<ItemType>(type)
        .with('needle', () => <NeedleForm />)
        .with('yarn', () => <YarnForm />)
        .exhaustive()}
    </>
  );
}
