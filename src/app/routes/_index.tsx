import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: '뜨개디비' }, { name: 'description', content: '' }];
};

export default function Index() {
  return <div>하이</div>;
}
