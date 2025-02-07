import { useState } from 'react';

export const YarnForm = () => {
  const [colorCount, setColorCount] = useState(1);
  const [colors, setColors] = useState([{ key: 1 }]);

  const handleAddColor = () => {
    setColors((prev) => [...prev, { key: colorCount + 1 }]);
    setColorCount((prev) => prev + 1);
  };

  const handleRemoveColor = (selectedKey: number) => {
    setColors((prev) => prev.filter(({ key }) => key !== selectedKey));
  };

  return (
    <form action={'/item/yarn/new'} method={'post'}>
      <label>
        이름
        <input type="text" name={'name'} required />
      </label>
      <label>
        가격
        <input type="number" name={'priceAmount'} max={10_000_000} />
      </label>
      <label>
        두께
        <input type="number" name={'thickness'} max={1_000} required />
      </label>
      <label>
        무게
        <input type="number" name={'weight'} max={1_000} required />
      </label>
      <label>
        성분
        <input type="text" name="composition" />
      </label>
      <label>
        구매처 링크
        <input type="text" name="url" />
      </label>
      <label>
        추천 바늘
        <input type="text" name="needleInfo" />
      </label>
      {colors.map((v) => (
        <fieldset key={v.key} name={'color'}>
          <label>
            <input type="color" name={`colorValue`} />
            색상
          </label>
          <label>
            <input type="text" name={`colorName`} />
            색상명
          </label>
          <button onClick={() => handleRemoveColor(v.key)}>X</button>
        </fieldset>
      ))}
      <button type={'button'} onClick={handleAddColor}>
        색상 추가
      </button>
      <label>
        메모
        <textarea name="memo" id="memo" cols={30} rows={10} maxLength={5000} />
      </label>
      <button>저장하기</button>
    </form>
  );
};
