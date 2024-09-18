"use client";

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import { ImageUpload } from "./image-upload";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

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

const INSTRUCTIONS =
  'Preencha o campo "Instruções" com orientações claras e objetivas para que a IA cumpra sua função. Por exemplo, "A IA deve analisar o comportamento online de MackerZugerberg e sugerir melhorias de produtividade. Ela deve processar dados como postagens, comentários e tempo de uso, e fornecer um relatório diário com recomendações personalizadas para otimizar seu tempo nas redes sociais, evitando distrações e promovendo eficiência."';

const SEED =
  "MackerZugerberg é uma pessoa altamente focada, analítica e com grande interesse em inovação tecnológica. Ele tem um perfil de liderança, é metódico, valoriza eficiência e gosta de tomar decisões baseadas em dados. É conhecido por sua determinação e capacidade de resolver problemas complexos rapidamente, sempre buscando otimizar processos e melhorar a experiência digital.";

const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schemaCompanion>>({
    defaultValues: {
      src: initialData?.src ?? "",
      name: initialData?.name ?? "",
      categoryId: Number(initialData?.categoryId) ?? undefined,
      description: initialData?.description ?? "",
      instructions: initialData?.instructions ?? "",
      seed: initialData?.seed ?? "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof schemaCompanion>) => {
    console.log(data);
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, data);
      } else {
        await axios.post(`/api/companion`, data);
      }

      router.refresh();
      router.push("/");
      toast({
        title: "success",
      });
    } catch (error) {
      toast({
        title: "error",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center pb-6"
        >
          <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
            <div className="col-span-2  w-full flex flex-col gap-2">
              <FormField
                {...form.register("src")}
                name="src"
                render={({ field }) => (
                  <FormItem
                    className="w-full flex justify-center border mb-10
                "
                  >
                    <FormControl>
                      <ImageUpload
                        onChange={field.onChange}
                        disabled={field.disabled}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
            <div className="col-span-2 md:col-span-1 w-full flex flex-col gap-2">
              <Label
                className="font-semibold uppercase font-mono"
                htmlFor="name"
              >
                name
              </Label>
              <Input
                disabled={isLoading}
                {...form.register("name")}
                id="name"
                placeholder="MackerZugerberg"
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
                disabled={isLoading}
                {...form.register("description")}
                id="description"
                placeholder="Eu Sou MackerZugerberg"
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
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-neutral-900  border-foreground/30"
                          disabled={isLoading}
                        >
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
                        placeholder={INSTRUCTIONS}
                        disabled={isLoading}
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
                        placeholder={SEED}
                        className="w-full bg-neutral-900  border border-foreground/30 focus:border-foreground/50 transition-all"
                        rows={8}
                        disabled={isLoading}
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
              mt-8 px-8 max-sm:w-full"
              >
                Create
                <WandSparkles className=" w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export { CompanionForm };
