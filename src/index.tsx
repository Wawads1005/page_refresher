import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import useSendMessageMutation from "@/hooks/chrome/use-send-message-mutation";
import useCurrentTabQuery from "@/hooks/chrome/use-current-tab-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useRefresherForm from "@/hooks/use-refresher-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode!);

function App() {
  const refresherForm = useRefresherForm();
  const currentTabQuery = useCurrentTabQuery();
  const startMessageMutation = useSendMessageMutation();
  const stopMessageMutation = useSendMessageMutation();

  if (currentTabQuery.isPending) {
    return <div>Loading current tab...</div>;
  }

  if (currentTabQuery.isError) {
    return (
      <div>Error loading current tab: {currentTabQuery.error.message}</div>
    );
  }

  if (!currentTabQuery.data?.id) {
    return <div>No active tab found.</div>;
  }

  return (
    <Form {...refresherForm}>
      <form
        className="grid gap-2"
        onSubmit={refresherForm.handleSubmit((input) =>
          startMessageMutation.mutate({
            action: "start",
            tabId: currentTabQuery.data?.id!,
            interval: input.interval,
          }),
        )}
        onReset={() =>
          stopMessageMutation.mutate({
            action: "stop",
            tabId: currentTabQuery.data?.id!,
          })
        }
      >
        <FormField
          control={refresherForm.control}
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interval</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button disabled={startMessageMutation.isPending} type="submit">
            Start
          </Button>
          <Button
            disabled={stopMessageMutation.isPending}
            type="reset"
            variant="destructive"
          >
            Stop
          </Button>
        </div>
      </form>
    </Form>
  );
}

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="p-6">
        <App />
      </main>
    </QueryClientProvider>
  </React.StrictMode>,
);
