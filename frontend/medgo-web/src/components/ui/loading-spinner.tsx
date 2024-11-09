import { cx } from "class-variance-authority";
import { Loader2 } from "lucide-react";

function LoadingSpinner({
  color = "default",
  className,
  size,
}: {
  color?: "default" | "primary";
  className?: string;
  size?: number;
}) {
  return (
    <Loader2
      size={size ?? 16}
      className={cx(
        "animate-spin",
        color === "primary" ? "text-black" : "",
        className
      )}
    />
  );
}

export { LoadingSpinner };
