"use client";

import { Checkbox as Cb } from "@/components/ui/checkbox";

type CheckboxProps = {
  text: string;
  textClassname?: string;
  checked: boolean;
  onCheckedChange: () => void;
};

export function Checkbox({
  text,
  textClassname,
  checked,
  onCheckedChange
}: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2 p-2">
      <Cb
        id={text}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="hover:opacity-60"
      />
      <label
        htmlFor={text}
        className={`${textClassname} text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
      >
        {text}
      </label>
    </div>
  );
}
