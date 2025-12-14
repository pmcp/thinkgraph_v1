// Team-based endpoint - requires @friendlyinternet/nuxt-crouton package
// The #crouton/team-auth alias is provided by @friendlyinternet/nuxt-crouton
// Install: pnpm add @friendlyinternet/nuxt-crouton
// Config: Add '@friendlyinternet/nuxt-crouton' to extends array in nuxt.config.ts
import { updateThinkgraphDecision } from '../../../../database/queries'
import { resolveTeamAndCheckMembership } from '#crouton/team-auth'
import type { ThinkgraphDecision } from '../../../../../types'

export default defineEventHandler(async (event) => {
  const { decisionId } = getRouterParams(event)
  const { team, user } = await resolveTeamAndCheckMembership(event)

  const body = await readBody<Partial<ThinkgraphDecision>>(event)

  return await updateThinkgraphDecision(decisionId, team.id, user.id, {
    title: body.title,
    description: body.description,
    status: body.status,
    parentId: body.parentId,
    position: body.position,
    dueDate: body.dueDate ? new Date(body.dueDate) : body.dueDate,
    priority: body.priority,
    outcome: body.outcome
  })
})