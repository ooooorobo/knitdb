import { Camelize } from 'camelize-ts';
import { Tables } from 'src/types/dto';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';

export const YarnCard = ({
  yarn,
  colors,
}: {
  yarn: Camelize<Tables<'yarns'>>;
  colors: Camelize<Tables<'yarn_colors'>>[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{yarn.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <span>{yarn.thickness}mm</span>
      </CardContent>
      <CardFooter>
        {colors.map(({ color, name, id }) => (
          <Badge key={id} className={'gap-2'}>
            <div
              className={'rounded-full w-3 h-3 bg-local'}
              style={{ background: color }}
            />
            <span>{name}</span>
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};
