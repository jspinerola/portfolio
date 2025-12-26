import { Button } from "./ui/button";

type BaseButtonProps = Parameters<typeof Button>[0];
type ButtonProps = Omit<BaseButtonProps, "asChild">;

interface LinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
  target?: string;
}

export default function LinkButton({ href, children, ...props }: LinkProps) {
  return (
    <Button asChild {...props}>
      <a href={href} target={props.target}>
        {children}
      </a>
    </Button>
  );
}
