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
import { Trash2 } from "lucide-react";

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
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) {
      throw new Error(sessionError.message);
    }
    if (!session) {
      throw new Error("Not logged in");
    }
    router.push(session?.user.id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-500/90">
          <Trash2 className="h-4 w-4" />
        </button>
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
