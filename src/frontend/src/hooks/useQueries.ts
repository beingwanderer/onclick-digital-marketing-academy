import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitLead() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      fullName,
      phoneNumber,
      emailAddress,
      purpose,
    }: {
      fullName: string;
      phoneNumber: string;
      emailAddress: string;
      purpose: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitLead(fullName, phoneNumber, emailAddress, purpose);
    },
  });
}
