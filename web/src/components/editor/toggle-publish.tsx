"use client";

import { Paste } from "types/types";
import { Button } from "@/components/ui/button";
import { useZact } from "zact/client";
import { toggleDraft } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function PublishUnpublishButton({ paste }: { paste: Paste }) {
  const { mutate, error, isLoading } = useZact(toggleDraft);
  const router = useRouter();

  function toggle() {
    mutate({
      id: paste.id,
      action: paste.draft ? "publish" : "unpublish",
    }).then(() => {
      router.refresh();

      if (error) {
        toast.error(error.message);
      }
    });
  }

  return (
    <>
      {paste.draft ? (
        <Button loading={isLoading} onClick={toggle}>
          Publish
        </Button>
      ) : (
        <Button variant="outline" loading={isLoading} onClick={toggle}>
          Unpublish
        </Button>
      )}
    </>
  );
}
