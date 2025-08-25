import z from "zod";

type RefresherFormModel = z.infer<typeof refresherFormModel>;

const refresherFormModel = z.object({
  interval: z.number().min(1, "Interval must be at least 1 second"),
});

type RefresherMessageModel = z.infer<typeof refresherMessageModel>;

const refresherMessageActionModel = z.enum(["start", "stop"]);

const refresherMessageModel = z
  .object({
    tabId: z.number(),
    interval: z.number().optional(),
    action: refresherMessageActionModel,
  })
  .refine(
    (input) => (input.action === "start" ? input.interval !== undefined : true),
    { message: "Interval is required for start action" },
  );

export type { RefresherFormModel, RefresherMessageModel };
export { refresherFormModel, refresherMessageModel };
