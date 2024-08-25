import { t } from "elysia";

export const workflowRequest = t.Object({
  name: t.String(),
  enabled: t.Boolean(),
  description: t.Optional(t.String()),
})

