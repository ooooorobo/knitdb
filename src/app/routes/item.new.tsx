import { NeedleForm } from 'src/components/form/needle/NeedleForm';
import { match } from 'ts-pattern';
import { YarnForm } from 'src/components/form/yarn/YarnForm';
import { ItemType } from 'src/constants/enum/itemType';
import { useSelectedItemType } from 'src/components/item/useSelectedItemType';
import { SelectItemType } from 'src/components/item/SelectItemType';

export default function ItemCreatePage() {
  const type = useSelectedItemType();

  return (
    <>
      <SelectItemType />
      {match<ItemType>(type)
        .with('needle', () => <NeedleForm />)
        .with('yarn', () => <YarnForm />)
        .exhaustive()}
    </>
  );
}
