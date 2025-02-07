import { useSearchParams } from '@remix-run/react';
import {
  itemTypeList,
  itemTypeScheme,
  ItemTypeToName,
} from 'src/constants/enum/itemType';
import { Tabs, TabsList, TabsTrigger } from 'app/components/ui/tabs';
import { useSelectedItemType } from 'src/components/item/useSelectedItemType';

export const SelectItemType = () => {
  const type = useSelectedItemType();
  const [, setSearchParams] = useSearchParams();
  const handleSelectType = (type: string) => {
    const { success, data } = itemTypeScheme.safeParse(type);
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
    <>
      <Tabs className="w-[400px]" value={type} onValueChange={handleSelectType}>
        <TabsList className="grid w-full grid-cols-2">
          {itemTypeList.map((t) => (
            <TabsTrigger key={t} value={t}>
              {ItemTypeToName[t].kr}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
};
