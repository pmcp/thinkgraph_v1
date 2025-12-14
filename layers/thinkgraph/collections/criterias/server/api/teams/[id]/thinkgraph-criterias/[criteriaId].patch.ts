// Team-based endpoint - requires @friendlyinternet/nuxt-crouton package
// The #crouton/team-auth alias is provided by @friendlyinternet/nuxt-crouton
// Install: pnpm add @friendlyinternet/nuxt-crouton
// Config: Add '@friendlyinternet/nuxt-crouton' to extends array in nuxt.config.ts
import { updateThinkgraphCriteria } from '../../../../database/queries'
import { resolveTeamAndCheckMembership } from '#crouton/team-auth'
import type { ThinkgraphCriteria } from '../../../../../types'

export default defineEventHandler(async (event) => {
  const { criteriaId } = getRouterParams(event)
  const { team, user } = await resolveTeamAndCheckMembership(event)

  const body = await readBody<Partial<ThinkgraphCriteria>>(event)

  return await updateThinkgraphCriteria(criteriaId, team.id, user.id, {
    decisionId: body.decisionId,
    title: body.title,
    description: body.description,
    weight: body.weight,
    order: body.order
  })
})