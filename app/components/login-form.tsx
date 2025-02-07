import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form method={'post'}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name={'email'}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  name={'password'}
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
