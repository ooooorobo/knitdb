import { Camelize } from 'camelize-ts';
import { Tables } from 'src/types/dto';
import { NeedleType, NeedleTypeToName } from 'src/constants/enum/needleType';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export const NeedleCard = ({
  needle,
}: {
  needle: Camelize<Tables<'needles'>>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{needle.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <span>{NeedleTypeToName[needle.type as NeedleType].kr}</span>
        <span>{needle.width}mm</span>
      </CardContent>
    </Card>
  );
};
