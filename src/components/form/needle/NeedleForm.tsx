import {
  NeedleTypeScheme,
  NeedleTypeToName,
} from 'src/constants/enum/needleType';

export const NeedleForm = () => {
  return (
    <form method={'post'}>
      <label>
        이름
        <input type="text" name={'name'} required />
      </label>
      <label>
        종류
        <select name="type" id="type" required>
          {NeedleTypeScheme.options.map((type) => (
            <option key={type} value={type}>
              {NeedleTypeToName[type].kr}
            </option>
          ))}
        </select>
      </label>
      <label>
        두께
        <input type="number" name={'width'} max={1_000} required />
      </label>
      <label>
        가격
        <input type="number" name={'priceAmount'} max={10_000_000} />
      </label>
      <label>
        구매처 링크
        <input type="text" name="url" />
      </label>
      <label>
        메모
        <textarea name="memo" id="memo" cols="30" rows="10" maxLength={5000} />
      </label>
      <button>저장하기</button>
    </form>
  );
};
