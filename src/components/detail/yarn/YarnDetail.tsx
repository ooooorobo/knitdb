import { Camelize } from 'camelize-ts';
import { Tables } from 'src/types/dto';
import styles from 'src/components/detail/needle/NeedleDetail.module.css';

export const YarnDetail = ({
  yarn,
  colors,
}: {
  yarn: Camelize<Tables<'yarns'>>;
  colors: Camelize<Tables<'yarn_colors'>>[];
}) => {
  return (
    <article>
      <h1>{yarn.name}</h1>
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
      <table>
        <tbody>
          <tr>
            <th>두께</th>
            <td>{yarn.thickness}mm</td>
          </tr>
          <tr>
            <th>무게</th>
            <td>{yarn.weight}g</td>
          </tr>
          <tr>
            <th>성분</th>
            <td>{yarn.composition}</td>
          </tr>
          <tr>
            <th>가격</th>
            <td>{yarn.priceAmount}원</td>
          </tr>
          {yarn.url && (
            <tr>
              <th>구매처 링크</th>
              <td>
                <a href={yarn.url}>{yarn.url}</a>
              </td>
            </tr>
          )}
          <tr>
            <th>추천 바늘</th>
            <td>{yarn.needleInfo}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.Memo}>{yarn.memo}</div>
    </article>
  );
};
