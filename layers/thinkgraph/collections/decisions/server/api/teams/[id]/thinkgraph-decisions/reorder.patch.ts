import { reorderSiblingsThinkgraphDecisions } from '../../../../database/queries'
import { eq, and } from 'drizzle-orm'
import * as tables from '@@/server/database/schema'

export default defineEventHandler(async (event) => {
  const { id: teamSlugOrId } = getRouterParams(event)
  const { user } = await requireUserSession(event)

  // Resolve team by slug or ID
  let team = await useDB()
    .select()
    .from(tables.teams)
    .where(eq(tables.teams.slug, teamSlugOrId))
    .get()

  // If not found by slug, try by ID
  if (!team) {
    team = await useDB()
      .select()
      .from(tables.teams)
      .where(eq(tables.teams.id, teamSlugOrId))
      .get()
  }

  if (!team) {
    throw createError({ statusCode: 404, statusMessage: 'Team not found' })
  }

  // Check if user is member of team
  const membership = await useDB()
    .select()
    .from(tables.teamMembers)
    .where(
      and(
        eq(tables.teamMembers.teamId, team.id),
        eq(tables.teamMembers.userId, user.id)
      )
    )
    .get()

  if (!membership) {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)

  // Validate input - expect array of { id, order }
  if (!Array.isArray(body.updates)) {
    throw createError({ statusCode: 400, statusMessage: 'updates must be an array' })
  }

  for (const update of body.updates) {
    if (!update.id || typeof update.order !== 'number') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Each update must have id and order (number)'
      })
    }
  }

  return await reorderSiblingsThinkgraphDecisions(team.id, body.updates)
})