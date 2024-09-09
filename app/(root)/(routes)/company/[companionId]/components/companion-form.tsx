"use client";

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const schemaCompanion = z.object({
  src: z.string({ message: "required source" }).min(1),
  name: z.string({ message: "required name" }).min(1),
  categoryId: z.number({ message: "required category" }).min(1),
  description: z.string({ message: "required description" }).min(1),
  instructions: z
    .string({ message: "required instructions min  200 characters" })
    .min(200),
  seed: z.string({ message: "required seed min 200 characters" }).min(200),
});

const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {
  const form = useForm<z.infer<typeof schemaCompanion>>({
    defaultValues: {
      src: "",
      name: "",
      categoryId: undefined,
      description: "",
      instructions: "",
      seed: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schemaCompanion>) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
        >
          <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
            <div className="col-span-2 md:col-span-1 w-full flex flex-col gap-2">
              <Label
                className="font-semibold uppercase font-mono"
                htmlFor="name"
              >
                name
              </Label>
              <Input
                {...form.register("name")}
                id="name"
                placeholder="cr7"
                className="w-full bg-neutral-900  border border-foreground/30 focus:border-foreground/50 transition-all placeholder-opacity-40 "
              />
            </div>

            <div className="col-span-2 md:col-span-1 w-full flex flex-col gap-2">
              <Label
                className="font-semibold uppercase font-mono"
                htmlFor="description"
              >
                description
              </Label>
              <Input
                {...form.register("description")}
                id="description"
                placeholder="cr7"
                className="w-full bg-neutral-900  border border-foreground/30 focus:border-foreground/50 transition-all"
              />
            </div>
            <div className="col-span-2 md:col-span-1 w-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold uppercase font-mono">
                      Category
                    </FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger className="bg-neutral-900  border-foreground/30">
                          <SelectValue placeholder={"category companion"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-900 border-foreground/30">
                        {categories.map((category) => (
                          <SelectItem value={category.id} key={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {form.formState.errors.categoryId?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 md:col-span-1 w-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-semibold uppercase font-mono"
                      htmlFor={field.name}
                    >
                      instructions
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        {...form.register("instructions")}
                        id={field.name}
                        className="w-full bg-neutral-900  border border-foreground/30 focus:border-foreground/50 transition-all"
                        rows={8}
                        placeholder="cr7"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 md:col-span-1 w-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="seed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-semibold uppercase font-mono"
                      htmlFor={field.name}
                    >
                      seed
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...form.register("seed")}
                        id={field.name}
                        className="w-full bg-neutral-900  border border-foreground/30 focus:border-foreground/50 transition-all"
                        rows={8}
                      ></Textarea>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <Button
                type="submit"
                variant="default"
                className="
              mt-8 px-8 "
              >
                Create
                <WandSparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export { CompanionForm };
