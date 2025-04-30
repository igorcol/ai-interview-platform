import React from "react";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage, FormField } from "./ui/form";
import { Input } from "./ui/input";

const CustomFormField = () => (
  <FormField
    control={form.control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" {...field} />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default CustomFormField;
