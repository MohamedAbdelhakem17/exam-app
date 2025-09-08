"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";
import React from "react";
import useDeleteAccount from "../../_hooks/use-delete-account";

export default function DeleteUserAccount() {
  // Mutation
  const { deleteProfile, isPending } = useDeleteAccount();
  return (
    <Dialog>
      <DialogOverlay />
      <DialogTrigger asChild>
        <Button variant={"red"} className="flex-1">
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:rounded-none border-none max-w-xl ">
        <div className="py-9 flex items-center justify-center flex-col text-center">
          <div className="flex items-center justify-center mx-auto rounded-full w-28 h-28 bg-red-50 mb-7">
            <div className="flex items-center justify-center mx-auto rounded-full w-20 h-20 bg-red-100">
              <TriangleAlert size="50" className="text-red-600" />
            </div>
          </div>
          <DialogTitle className="font-medium mb-2 text-red-600">
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone.
          </DialogDescription>
        </div>

        <DialogFooter className="bg-gray-50 border-t border-gray-200  sm:justify-center flex gap-x-2  py-6">
          <DialogClose asChild className="w-fit bg-red-800">
            <Button
              variant="secondary"
              className="rounded-none bg-gray-200 py-3 px-2 w-52 hover:bg-gray-100"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => deleteProfile()}
            disabled={isPending}
            variant="destructive"
            className="rounded-none bg-red-600 py-3 px-2  w-52 "
          >
            Yes Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
