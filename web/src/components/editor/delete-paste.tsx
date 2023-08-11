"use client";
import { FormEvent, useState } from "react";
import { LoginComponent } from "../login";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PublishForm } from "./publish-form";
import { Paste } from "types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/supabase";
import { useRouter } from "next/navigation";

export default function DeletePasteConfirmation({ paste }: { paste: Paste }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  const deletePaste = async () => {
    setDeleting(true);
    await supabase.from("pastes").delete().eq("id", paste.id);
    await supabase.storage.from("pastes").remove([paste.file]);
    setOpen(false);
    setDeleting(false);
    router.push("/me");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this paste?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={() => deletePaste()}
            loading={deleting}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
