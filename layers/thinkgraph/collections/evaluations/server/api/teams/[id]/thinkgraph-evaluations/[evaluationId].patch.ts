// Team-based endpoint - requires @friendlyinternet/nuxt-crouton package
// The #crouton/team-auth alias is provided by @friendlyinternet/nuxt-crouton
// Install: pnpm add @friendlyinternet/nuxt-crouton
// Config: Add '@friendlyinternet/nuxt-crouton' to extends array in nuxt.config.ts
import { updateThinkgraphEvaluation } from '../../../../database/queries'
import { resolveTeamAndCheckMembership } from '#crouton/team-auth'
import type { ThinkgraphEvaluation } from '../../../../../types'

export default defineEventHandler(async (event) => {
  const { evaluationId } = getRouterParams(event)
  const { team, user } = await resolveTeamAndCheckMembership(event)

  const body = await readBody<Partial<ThinkgraphEvaluation>>(event)

  return await updateThinkgraphEvaluation(evaluationId, team.id, user.id, {
    decisionId: body.decisionId,
    optionId: body.optionId,
    criteriaId: body.criteriaId,
    score: body.score,
    notes: body.notes
  })
})