// Generated with array reference post-processing support (v2024-10-12)
import { eq, and, desc, inArray } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import * as tables from './schema'
import type { ThinkgraphEvaluation, NewThinkgraphEvaluation } from '../../types'
import { users } from '~~/server/database/schema'

export async function getAllThinkgraphEvaluations(teamId: string) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const evaluations = await db
    .select({
      ...tables.thinkgraphEvaluations,
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
    .from(tables.thinkgraphEvaluations)
    .leftJoin(ownerUsers, eq(tables.thinkgraphEvaluations.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphEvaluations.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphEvaluations.updatedBy, updatedByUsers.id))
    .where(eq(tables.thinkgraphEvaluations.teamId, teamId))
    .orderBy(desc(tables.thinkgraphEvaluations.createdAt))

  return evaluations
}

export async function getThinkgraphEvaluationsByIds(teamId: string, evaluationIds: string[]) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const evaluations = await db
    .select({
      ...tables.thinkgraphEvaluations,
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
    .from(tables.thinkgraphEvaluations)
    .leftJoin(ownerUsers, eq(tables.thinkgraphEvaluations.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphEvaluations.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphEvaluations.updatedBy, updatedByUsers.id))
    .where(
      and(
        eq(tables.thinkgraphEvaluations.teamId, teamId),
        inArray(tables.thinkgraphEvaluations.id, evaluationIds)
      )
    )
    .orderBy(desc(tables.thinkgraphEvaluations.createdAt))

  return evaluations
}

export async function createThinkgraphEvaluation(data: NewThinkgraphEvaluation) {
  const db = useDB()

  const [evaluation] = await db
    .insert(tables.thinkgraphEvaluations)
    .values(data)
    .returning()

  return evaluation
}

export async function updateThinkgraphEvaluation(
  recordId: string,
  teamId: string,
  ownerId: string,
  updates: Partial<ThinkgraphEvaluation>
) {
  const db = useDB()

  const [evaluation] = await db
    .update(tables.thinkgraphEvaluations)
    .set({
      ...updates,
      updatedBy: ownerId
    })
    .where(
      and(
        eq(tables.thinkgraphEvaluations.id, recordId),
        eq(tables.thinkgraphEvaluations.teamId, teamId),
        eq(tables.thinkgraphEvaluations.owner, ownerId)
      )
    )
    .returning()

  if (!evaluation) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphEvaluation not found or unauthorized'
    })
  }

  return evaluation
}

export async function deleteThinkgraphEvaluation(
  recordId: string,
  teamId: string,
  ownerId: string
) {
  const db = useDB()

  const [deleted] = await db
    .delete(tables.thinkgraphEvaluations)
    .where(
      and(
        eq(tables.thinkgraphEvaluations.id, recordId),
        eq(tables.thinkgraphEvaluations.teamId, teamId),
        eq(tables.thinkgraphEvaluations.owner, ownerId)
      )
    )
    .returning()

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphEvaluation not found or unauthorized'
    })
  }

  return { success: true }
}