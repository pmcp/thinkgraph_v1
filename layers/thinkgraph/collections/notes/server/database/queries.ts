// Generated with array reference post-processing support (v2024-10-12)
import { eq, and, desc, inArray } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import * as tables from './schema'
import type { ThinkgraphNote, NewThinkgraphNote } from '../../types'
import { users } from '~~/server/database/schema'

export async function getAllThinkgraphNotes(teamId: string) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const notes = await db
    .select({
      ...tables.thinkgraphNotes,
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
    .from(tables.thinkgraphNotes)
    .leftJoin(ownerUsers, eq(tables.thinkgraphNotes.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphNotes.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphNotes.updatedBy, updatedByUsers.id))
    .where(eq(tables.thinkgraphNotes.teamId, teamId))
    .orderBy(desc(tables.thinkgraphNotes.createdAt))

  return notes
}

export async function getThinkgraphNotesByIds(teamId: string, noteIds: string[]) {
  const db = useDB()

  const ownerUsers = alias(users, 'ownerUsers')
  const createdByUsers = alias(users, 'createdByUsers')
  const updatedByUsers = alias(users, 'updatedByUsers')

  // @ts-expect-error Complex select with joins requires type assertion
  const notes = await db
    .select({
      ...tables.thinkgraphNotes,
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
    .from(tables.thinkgraphNotes)
    .leftJoin(ownerUsers, eq(tables.thinkgraphNotes.owner, ownerUsers.id))
    .leftJoin(createdByUsers, eq(tables.thinkgraphNotes.createdBy, createdByUsers.id))
    .leftJoin(updatedByUsers, eq(tables.thinkgraphNotes.updatedBy, updatedByUsers.id))
    .where(
      and(
        eq(tables.thinkgraphNotes.teamId, teamId),
        inArray(tables.thinkgraphNotes.id, noteIds)
      )
    )
    .orderBy(desc(tables.thinkgraphNotes.createdAt))

  return notes
}

export async function createThinkgraphNote(data: NewThinkgraphNote) {
  const db = useDB()

  const [note] = await db
    .insert(tables.thinkgraphNotes)
    .values(data)
    .returning()

  return note
}

export async function updateThinkgraphNote(
  recordId: string,
  teamId: string,
  ownerId: string,
  updates: Partial<ThinkgraphNote>
) {
  const db = useDB()

  const [note] = await db
    .update(tables.thinkgraphNotes)
    .set({
      ...updates,
      updatedBy: ownerId
    })
    .where(
      and(
        eq(tables.thinkgraphNotes.id, recordId),
        eq(tables.thinkgraphNotes.teamId, teamId),
        eq(tables.thinkgraphNotes.owner, ownerId)
      )
    )
    .returning()

  if (!note) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphNote not found or unauthorized'
    })
  }

  return note
}

export async function deleteThinkgraphNote(
  recordId: string,
  teamId: string,
  ownerId: string
) {
  const db = useDB()

  const [deleted] = await db
    .delete(tables.thinkgraphNotes)
    .where(
      and(
        eq(tables.thinkgraphNotes.id, recordId),
        eq(tables.thinkgraphNotes.teamId, teamId),
        eq(tables.thinkgraphNotes.owner, ownerId)
      )
    )
    .returning()

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'ThinkgraphNote not found or unauthorized'
    })
  }

  return { success: true }
}