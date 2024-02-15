import { Calendar } from '@server/entities/calendar'
import { publicProcedure } from '@server/trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(z.object({ permalink: z.string() }))
  .query(async ({ input: { permalink }, ctx: { db } }) => {
    const calendar = await db.getRepository(Calendar).findOneBy({ permalink })
    if (!calendar) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Calendar not found',
      })
    }
    return calendar
  })
