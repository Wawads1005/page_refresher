import getCurrentTab from "@/actions/chrome/get-current-tab";
import { useQuery } from "@tanstack/react-query";

function useCurrentTabQuery() {
  const currentTab = useQuery({
    queryKey: ["currentTab"],
    queryFn: getCurrentTab,
  });

  return currentTab;
}

export default useCurrentTabQuery;
