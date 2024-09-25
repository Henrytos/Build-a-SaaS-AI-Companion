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

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

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
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, data);
      } else {
        await axios.post(`/api/companion`, data);
      }

      router.push("/");
      router.refresh();
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
                          defaultValue={field.value}
                          className="bg-neutral-900  border-foreground/30"
                          disabled={isLoading}
                        >
                          <SelectValue placeholder={"category companion"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        className="bg-neutral-900 border-foreground/30"
                        defaultValue={field.value}
                      >
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
                        placeholder={PREAMBLE}
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
                        placeholder={SEED_CHAT}
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
