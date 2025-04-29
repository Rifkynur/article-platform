"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useHandleCategory } from "@/hook/useHandeCategory";

const schema = z.object({
  name: z.string().min(1, "Category field cannot be empty"),
});

type FormData = z.infer<typeof schema>;

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  categoryName?: string;
  onEditSuccess: () => void;
}

const EditCategoryModal = ({ open, onOpenChange, categoryId, categoryName, onEditSuccess }: AddCategoryModalProps) => {
  const { editCategory } = useHandleCategory();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: categoryName || "",
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    editCategory({ id: categoryId, name: data.name });
    onOpenChange(false);
    onEditSuccess();
    form.reset();
  };

  useEffect(() => {
    if (categoryName) {
      form.setValue("name", categoryName);
    }
  }, [categoryName, form]);
  return (
    <>
      <Toaster position="top-right" />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="lg:w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Cagegory</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <div>
                          <Input type="text" placeholder="Input Category" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 items-center mt-4 justify-end">
                  <Button type="button" variant={"outline"} onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600">
                    Edit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCategoryModal;
