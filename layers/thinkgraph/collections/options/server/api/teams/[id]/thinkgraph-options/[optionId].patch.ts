// Team-based endpoint - requires @friendlyinternet/nuxt-crouton package
// The #crouton/team-auth alias is provided by @friendlyinternet/nuxt-crouton
// Install: pnpm add @friendlyinternet/nuxt-crouton
// Config: Add '@friendlyinternet/nuxt-crouton' to extends array in nuxt.config.ts
import { updateThinkgraphOption } from '../../../../database/queries'
import { resolveTeamAndCheckMembership } from '#crouton/team-auth'
import type { ThinkgraphOption } from '../../../../../types'

export default defineEventHandler(async (event) => {
  const { optionId } = getRouterParams(event)
  const { team, user } = await resolveTeamAndCheckMembership(event)

  const body = await readBody<Partial<ThinkgraphOption>>(event)

  return await updateThinkgraphOption(optionId, team.id, user.id, {
    decisionId: body.decisionId,
    title: body.title,
    description: body.description,
    pros: body.pros,
    cons: body.cons,
    order: body.order
  })
})