import { NeedleForm } from 'src/components/form/needle/NeedleForm';
import { useState } from 'react';
import { match } from 'ts-pattern';

const itemTypeList = ['yarn', 'needle'] as const;

type ItemType = (typeof itemTypeList)[number];

export default function ItemCreatePage() {
  const [type, setType] = useState<ItemType>('yarn');

  return (
    <>
      <select name="type" onChange={(e) => setType(e.target.value as ItemType)}>
        {itemTypeList.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      {match<ItemType>(type)
        .with('needle', () => <NeedleForm />)
        .with('yarn', () => <></>)
        .exhaustive()}
    </>
  );
}
