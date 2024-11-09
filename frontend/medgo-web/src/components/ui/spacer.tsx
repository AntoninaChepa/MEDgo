import { cva, VariantProps } from "class-variance-authority";

export const spacerVariantConfig = {
  variants: {
    size: {
      1: "h-1",
      2: "h-2",
      3: "h-3",
      4: "h-4",
      5: "h-5",
      6: "h-6",
      7: "h-7",
      8: "h-8",
      9: "h-9",
      10: "h-10",
      11: "h-11",
      12: "h-12",
      16: "h-16",
      20: "h-20",
      24: "h-24",
      28: "h-28",
      32: "h-32",
    },
  },
};

const spacerVariants = cva("", spacerVariantConfig);

export type SpacerProps = VariantProps<typeof spacerVariants>;

export const Spacer = ({ size }: SpacerProps) => {
  return <div className={spacerVariants({ size })} />;
};
