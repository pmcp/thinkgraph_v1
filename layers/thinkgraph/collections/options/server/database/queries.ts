// Generated with array reference post-processing support (v2024-10-12)
import { eq, and, desc, inArray } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import * as tables from './schema'
import type { ThinkgraphOption, NewThinkgraphOption } from '../../types'
import { users } from '~~/server/database/schema'

export async function getAllThinkgraphOptions(teamId: string) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const options = await db
    .select({
      ...tables.thinkgraphOptions,
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
    .from(tables.thinkgraphOptions)
    .leftJoin(ownerUsers, eq(tables.thinkgraphOptions.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphOptions.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphOptions.updatedBy, updatedByUsers.id))
    .where(eq(tables.thinkgraphOptions.teamId, teamId))
    .orderBy(desc(tables.thinkgraphOptions.createdAt))

  return options
}

export async function getThinkgraphOptionsByIds(teamId: string, optionIds: string[]) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const options = await db
    .select({
      ...tables.thinkgraphOptions,
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
    .from(tables.thinkgraphOptions)
    .leftJoin(ownerUsers, eq(tables.thinkgraphOptions.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphOptions.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphOptions.updatedBy, updatedByUsers.id))
    .where(
      and(
        eq(tables.thinkgraphOptions.teamId, teamId),
        inArray(tables.thinkgraphOptions.id, optionIds)
      )
    )
    .orderBy(desc(tables.thinkgraphOptions.createdAt))

  return options
}

export async function createThinkgraphOption(data: NewThinkgraphOption) {
  const db = useDB()

  const [option] = await db
    .insert(tables.thinkgraphOptions)
    .values(data)
    .returning()

  return option
}

export async function updateThinkgraphOption(
  recordId: string,
  teamId: string,
  ownerId: string,
  updates: Partial<ThinkgraphOption>
) {
  const db = useDB()

  const [option] = await db
    .update(tables.thinkgraphOptions)
    .set({
      ...updates,
      updatedBy: ownerId
    })
    .where(
      and(
        eq(tables.thinkgraphOptions.id, recordId),
        eq(tables.thinkgraphOptions.teamId, teamId),
        eq(tables.thinkgraphOptions.owner, ownerId)
      )
    )
    .returning()

  if (!option) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphOption not found or unauthorized'
    })
  }

  return option
}

export async function deleteThinkgraphOption(
  recordId: string,
  teamId: string,
  ownerId: string
) {
  const db = useDB()

  const [deleted] = await db
    .delete(tables.thinkgraphOptions)
    .where(
      and(
        eq(tables.thinkgraphOptions.id, recordId),
        eq(tables.thinkgraphOptions.teamId, teamId),
        eq(tables.thinkgraphOptions.owner, ownerId)
      )
    )
    .returning()

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphOption not found or unauthorized'
    })
  }

  return { success: true }
}