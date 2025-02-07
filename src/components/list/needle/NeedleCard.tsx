import { Camelize } from 'camelize-ts';
import { Tables } from 'src/types/dto';
import { NeedleType, NeedleTypeToName } from 'src/constants/enum/needleType';

export const NeedleCard = ({
  needle,
}: {
  needle: Camelize<Tables<'needles'>>;
}) => {
  return (
    <article>
      <h3>{needle.name}</h3>
      <span>{NeedleTypeToName[needle.type as NeedleType].kr}</span>
      <span>{needle.width}mm</span>
    </article>
  );
};
