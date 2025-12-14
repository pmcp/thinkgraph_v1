// Team-based endpoint - requires @friendlyinternet/nuxt-crouton package
// The #crouton/team-auth alias is provided by @friendlyinternet/nuxt-crouton
// Install: pnpm add @friendlyinternet/nuxt-crouton
// Config: Add '@friendlyinternet/nuxt-crouton' to extends array in nuxt.config.ts
import { updateThinkgraphNote } from '../../../../database/queries'
import { resolveTeamAndCheckMembership } from '#crouton/team-auth'
import type { ThinkgraphNote } from '../../../../../types'

export default defineEventHandler(async (event) => {
  const { noteId } = getRouterParams(event)
  const { team, user } = await resolveTeamAndCheckMembership(event)

  const body = await readBody<Partial<ThinkgraphNote>>(event)

  return await updateThinkgraphNote(noteId, team.id, user.id, {
    entityType: body.entityType,
    entityId: body.entityId,
    content: body.content,
    type: body.type
  })
})