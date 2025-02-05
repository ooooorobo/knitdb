import { Tables } from 'src/types/dto';
import { Camelize } from 'camelize-ts';
import styles from './NeedleDetail.module.css';
import { NeedleTypeToName } from 'src/constants/enum/needleType';

export const NeedleDetail = ({
  needle,
}: {
  needle: Camelize<Tables<'needles'>>;
}) => {
  return (
    <article>
      <h1>{needle.name}</h1>
      <table>
        <tbody>
          <tr>
            <th>종류</th>
            <td>{NeedleTypeToName[needle.type].kr}</td>
          </tr>
          <tr>
            <th>두께</th>
            <td>{needle.width}mm</td>
          </tr>
          <tr>
            <th>가격</th>
            <td>{needle.priceAmount}원</td>
          </tr>
          <tr>
            <th>구매처 링크</th>
            <td>
              <a href={needle.url}>{needle.url}</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.Memo}>{needle.memo}</div>
    </article>
  );
};
