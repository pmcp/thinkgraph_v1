// Generated with array reference post-processing support (v2024-10-12)
import { eq, and, desc, inArray } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import * as tables from './schema'
import type { ThinkgraphCriteria, NewThinkgraphCriteria } from '../../types'
import { users } from '~~/server/database/schema'

export async function getAllThinkgraphCriterias(teamId: string) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const criterias = await db
    .select({
      ...tables.thinkgraphCriterias,
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
    .from(tables.thinkgraphCriterias)
    .leftJoin(ownerUsers, eq(tables.thinkgraphCriterias.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphCriterias.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphCriterias.updatedBy, updatedByUsers.id))
    .where(eq(tables.thinkgraphCriterias.teamId, teamId))
    .orderBy(desc(tables.thinkgraphCriterias.createdAt))

  return criterias
}

export async function getThinkgraphCriteriasByIds(teamId: string, criteriaIds: string[]) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const criterias = await db
    .select({
      ...tables.thinkgraphCriterias,
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
    .from(tables.thinkgraphCriterias)
    .leftJoin(ownerUsers, eq(tables.thinkgraphCriterias.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphCriterias.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphCriterias.updatedBy, updatedByUsers.id))
    .where(
      and(
        eq(tables.thinkgraphCriterias.teamId, teamId),
        inArray(tables.thinkgraphCriterias.id, criteriaIds)
      )
    )
    .orderBy(desc(tables.thinkgraphCriterias.createdAt))

  return criterias
}

export async function createThinkgraphCriteria(data: NewThinkgraphCriteria) {
  const db = useDB()

  const [criteria] = await db
    .insert(tables.thinkgraphCriterias)
    .values(data)
    .returning()

  return criteria
}

export async function updateThinkgraphCriteria(
  recordId: string,
  teamId: string,
  ownerId: string,
  updates: Partial<ThinkgraphCriteria>
) {
  const db = useDB()

  const [criteria] = await db
    .update(tables.thinkgraphCriterias)
    .set({
      ...updates,
      updatedBy: ownerId
    })
    .where(
      and(
        eq(tables.thinkgraphCriterias.id, recordId),
        eq(tables.thinkgraphCriterias.teamId, teamId),
        eq(tables.thinkgraphCriterias.owner, ownerId)
      )
    )
    .returning()

  if (!criteria) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphCriteria not found or unauthorized'
    })
  }

  return criteria
}

export async function deleteThinkgraphCriteria(
  recordId: string,
  teamId: string,
  ownerId: string
) {
  const db = useDB()

  const [deleted] = await db
    .delete(tables.thinkgraphCriterias)
    .where(
      and(
        eq(tables.thinkgraphCriterias.id, recordId),
        eq(tables.thinkgraphCriterias.teamId, teamId),
        eq(tables.thinkgraphCriterias.owner, ownerId)
      )
    )
    .returning()

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphCriteria not found or unauthorized'
    })
  }

  return { success: true }
}