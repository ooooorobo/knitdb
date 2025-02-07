import { Camelize } from 'camelize-ts';
import { Tables } from 'src/types/dto';

export const YarnCard = ({
  yarn,
  colors,
}: {
  yarn: Camelize<Tables<'yarns'>>;
  colors: Camelize<Tables<'yarn_colors'>>[];
}) => {
  return (
    <article>
      <h3>{yarn.name}</h3>
      <span>{yarn.thickness}mm</span>
      {colors.map(({ color, name, id }) => (
        <div key={id}>
          <div
            style={{
              background: color,
              borderRadius: '50px',
              width: '16px',
              height: '16px',
            }}
          />
          <span>{name}</span>
        </div>
      ))}
    </article>
  );
};
