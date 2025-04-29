"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/app/store/useAuthstore";
import { Toaster } from "@/components/ui/sonner";
import { useHandleCategory } from "@/hook/useHandeCategory";

const schema = z.object({
  name: z.string().min(1, "Category field cannot be empty"),
  userId: z.string().min(1, "User ID cannot be empty"),
});

type FormData = z.infer<typeof schema>;

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddCategoryModal = ({ open, onOpenChange }: AddCategoryModalProps) => {
  const { user } = useAuthStore((state) => state);
  const { addCategory } = useHandleCategory();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      userId: user?.id,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    addCategory(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <>
      <Toaster position="top-right" />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="lg:w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Cagegory</DialogTitle>
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
                    add
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

export default AddCategoryModal;
