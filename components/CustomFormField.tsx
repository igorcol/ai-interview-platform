import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
}

const CustomFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} type={type} className="input" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default CustomFormField;
