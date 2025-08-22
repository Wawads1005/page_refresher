import sendMessage from "@/actions/chrome/send-message";
import { useMutation } from "@tanstack/react-query";

function useSendMessageMutation() {
  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
  });

  return sendMessageMutation;
}

export default useSendMessageMutation;
