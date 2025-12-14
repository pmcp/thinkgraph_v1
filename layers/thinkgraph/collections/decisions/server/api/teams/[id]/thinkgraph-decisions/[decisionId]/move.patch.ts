import { updatePositionThinkgraphDecision } from '../../../../../database/queries'
import { eq, and } from 'drizzle-orm'
import * as tables from '@@/server/database/schema'

export default defineEventHandler(async (event) => {
  const { id: teamSlugOrId, decisionId } = getRouterParams(event)
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

  // Validate input
  if (body.order === undefined || typeof body.order !== 'number') {
    throw createError({ statusCode: 400, statusMessage: 'order is required and must be a number' })
  }

  // parentId can be null (move to root) or a valid ID
  const parentId = body.parentId ?? null

  return await updatePositionThinkgraphDecision(team.id, decisionId, parentId, body.order)
})