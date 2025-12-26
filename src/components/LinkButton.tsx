import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

type BaseButtonProps = Parameters<typeof Button>[0];
type ButtonProps = Omit<BaseButtonProps, "asChild">;

interface LinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  showIcon?: boolean;
}
export default function LinkButton({
  href,
  children,
  showIcon = true,
  ...props
}: LinkProps) {
  return (
    <Button asChild {...props}>
      <a href={href} target={props.target} className="font-mono lowercase">
        {children} {showIcon && <ArrowUpRight />}
      </a>
    </Button>
  );
}
