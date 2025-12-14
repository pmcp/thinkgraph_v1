// Generated with array reference post-processing support (v2024-10-12)
import { eq, and, desc, inArray, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import * as tables from './schema'
import type { ThinkgraphDecision, NewThinkgraphDecision } from '../../types'
import { users } from '~~/server/database/schema'

export async function getAllThinkgraphDecisions(teamId: string) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const decisions = await db
    .select({
      ...tables.thinkgraphDecisions,
      ownerUser: {
        id: ownerUsers.id,
        name: ownerUsers.name,
        email: ownerUsers.email,
        avatarUrl: ownerUsers.avatarUrl
      },
      createdByUser: {
        id: createdByUsers.id,
        name: createdByUsers.name,
        email: createdByUsers.email,
        avatarUrl: createdByUsers.avatarUrl
      },
      updatedByUser: {
        id: updatedByUsers.id,
        name: updatedByUsers.name,
        email: updatedByUsers.email,
        avatarUrl: updatedByUsers.avatarUrl
      }
    })
    .from(tables.thinkgraphDecisions)
    .leftJoin(ownerUsers, eq(tables.thinkgraphDecisions.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphDecisions.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphDecisions.updatedBy, updatedByUsers.id))
    .where(eq(tables.thinkgraphDecisions.teamId, teamId))
    .orderBy(desc(tables.thinkgraphDecisions.createdAt))

  return decisions
}

export async function getThinkgraphDecisionsByIds(teamId: string, decisionIds: string[]) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const decisions = await db
    .select({
      ...tables.thinkgraphDecisions,
      ownerUser: {
        id: ownerUsers.id,
        name: ownerUsers.name,
        email: ownerUsers.email,
        avatarUrl: ownerUsers.avatarUrl
      },
      createdByUser: {
        id: createdByUsers.id,
        name: createdByUsers.name,
        email: createdByUsers.email,
        avatarUrl: createdByUsers.avatarUrl
      },
      updatedByUser: {
        id: updatedByUsers.id,
        name: updatedByUsers.name,
        email: updatedByUsers.email,
        avatarUrl: updatedByUsers.avatarUrl
      }
    })
    .from(tables.thinkgraphDecisions)
    .leftJoin(ownerUsers, eq(tables.thinkgraphDecisions.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphDecisions.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphDecisions.updatedBy, updatedByUsers.id))
    .where(
      and(
        eq(tables.thinkgraphDecisions.teamId, teamId),
        inArray(tables.thinkgraphDecisions.id, decisionIds)
      )
    )
    .orderBy(desc(tables.thinkgraphDecisions.createdAt))

  return decisions
}

export async function createThinkgraphDecision(data: NewThinkgraphDecision) {
  const db = useDB()

  const [decision] = await db
    .insert(tables.thinkgraphDecisions)
    .values(data)
    .returning()

  return decision
}

export async function updateThinkgraphDecision(
  recordId: string,
  teamId: string,
  ownerId: string,
  updates: Partial<ThinkgraphDecision>
) {
  const db = useDB()

  const [decision] = await db
    .update(tables.thinkgraphDecisions)
    .set({
      ...updates,
      updatedBy: ownerId
    })
    .where(
      and(
        eq(tables.thinkgraphDecisions.id, recordId),
        eq(tables.thinkgraphDecisions.teamId, teamId),
        eq(tables.thinkgraphDecisions.owner, ownerId)
      )
    )
    .returning()

  if (!decision) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphDecision not found or unauthorized'
    })
  }

  return decision
}

export async function deleteThinkgraphDecision(
  recordId: string,
  teamId: string,
  ownerId: string
) {
  const db = useDB()

  const [deleted] = await db
    .delete(tables.thinkgraphDecisions)
    .where(
      and(
        eq(tables.thinkgraphDecisions.id, recordId),
        eq(tables.thinkgraphDecisions.teamId, teamId),
        eq(tables.thinkgraphDecisions.owner, ownerId)
      )
    )
    .returning()

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphDecision not found or unauthorized'
    })
  }

  return { success: true }
}

// Tree hierarchy queries (auto-generated when hierarchy: true)

export async function getTreeDataThinkgraphDecisions(teamId: string) {
  const db = useDB()

  const decisions = await db
    .select()
    .from(tables.thinkgraphDecisions)
    .where(eq(tables.thinkgraphDecisions.teamId, teamId))
    .orderBy(tables.thinkgraphDecisions.path, tables.thinkgraphDecisions.order)

  return decisions
}

export async function updatePositionThinkgraphDecision(
  teamId: string,
  id: string,
  newParentId: string | null,
  newOrder: number
) {
  const db = useDB()

  // Get the current item to find its path
  const [current] = await db
    .select()
    .from(tables.thinkgraphDecisions)
    .where(
      and(
        eq(tables.thinkgraphDecisions.id, id),
        eq(tables.thinkgraphDecisions.teamId, teamId)
      )
    )

  if (!current) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphDecision not found'
    })
  }

  // Calculate new path and depth
  let newPath: string
  let newDepth: number

  if (newParentId) {
    const [parent] = await db
      .select()
      .from(tables.thinkgraphDecisions)
      .where(
        and(
          eq(tables.thinkgraphDecisions.id, newParentId),
          eq(tables.thinkgraphDecisions.teamId, teamId)
        )
      )

    if (!parent) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Parent ThinkgraphDecision not found'
      })
    }

    // Prevent moving item to its own descendant
    if (parent.path.startsWith(current.path)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Cannot move item to its own descendant'
      })
    }

    newPath = `${parent.path}${id}/`
    newDepth = parent.depth + 1
  } else {
    newPath = `/${id}/`
    newDepth = 0
  }

  const oldPath = current.path

  // Update the item itself
  const [updated] = await db
    .update(tables.thinkgraphDecisions)
    .set({
      parentId: newParentId,
      path: newPath,
      depth: newDepth,
      order: newOrder
    })
    .where(
      and(
        eq(tables.thinkgraphDecisions.id, id),
        eq(tables.thinkgraphDecisions.teamId, teamId)
      )
    )
    .returning()

  // Update all descendants' paths if the path changed
  if (oldPath !== newPath) {
    // Get all descendants
    const descendants = await db
      .select()
      .from(tables.thinkgraphDecisions)
      .where(
        and(
          eq(tables.thinkgraphDecisions.teamId, teamId),
          sql`${tables.thinkgraphDecisions.path} LIKE ${oldPath + '%'} AND ${tables.thinkgraphDecisions.id} != ${id}`
        )
      )

    // Update each descendant's path and depth
    for (const descendant of descendants) {
      const descendantNewPath = descendant.path.replace(oldPath, newPath)
      const depthDiff = newDepth - current.depth

      await db
        .update(tables.thinkgraphDecisions)
        .set({
          path: descendantNewPath,
          depth: descendant.depth + depthDiff
        })
        .where(eq(tables.thinkgraphDecisions.id, descendant.id))
    }
  }

  return updated
}

export async function reorderSiblingsThinkgraphDecisions(
  teamId: string,
  updates: { id: string; order: number }[]
) {
  const db = useDB()

  const results = []

  for (const update of updates) {
    const [updated] = await db
      .update(tables.thinkgraphDecisions)
      .set({ order: update.order })
      .where(
        and(
          eq(tables.thinkgraphDecisions.id, update.id),
          eq(tables.thinkgraphDecisions.teamId, teamId)
        )
      )
      .returning()

    if (updated) {
      results.push(updated)
    }
  }

  return results
}