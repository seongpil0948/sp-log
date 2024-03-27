import { Chip, ChipProps } from "@nextui-org/chip";
import React from "react";
import { paragraph } from "../server-only/primitives";

export interface ChipListProps {
  tags: string[];
  chipProps?: ChipProps;
  onClose?: (item: string, index: number) => void;
}

const colors: ChipProps["color"][] = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];
const variants: ChipProps["variant"][] = ["solid", "bordered", "faded"];

export const ChipList = ({ tags, chipProps, onClose }: ChipListProps) => {
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const variant = variants[Math.floor(Math.random() * variants.length)];
  return (
    <div className="flex gap-1 mt-1">
      {tags.map((item, index) => (
        <Chip
          key={item + index}
          classNames={{
            base: "min-w-30 h-5 p-2 md:p-5",
            content: paragraph({ size: "md" }),
          }}
          variant={variant}
          color={getRandomColor()}
          onClose={onClose ? () => onClose(item, index) : undefined}
          {...(chipProps as any)}
        >
          {item}
        </Chip>
      ))}
    </div>
  );
};
