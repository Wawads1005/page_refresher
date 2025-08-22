import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { refresherFormModel } from "@/lib/model";

const DEFAULT_INTERVAL = 5;

function useRefresherForm() {
  const refresherForm = useForm({
    resolver: zodResolver(refresherFormModel),
    defaultValues: {
      interval: DEFAULT_INTERVAL,
    },
  });

  return refresherForm;
}

export default useRefresherForm;
