import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreateNutrionService as CreateNutritionService } from 'src/services/nutrition/CreateNutritionService'
import { z } from 'zod'

export class CreateNutritionController {
  constructor(private readonly nutritionService: CreateNutritionService) {
    this.handle = this.handle.bind(this)
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const BodySchema = z.object({
      name: z.string(),
      weight: z.number(),
      height: z.number(),
      gender: z.string(),
      age: z.number(),
      objective: z.string(),
      level: z.string(),
    })

    const body = BodySchema.parse(req.body)
    const service = await this.nutritionService.execute(body)

    res.status(201).send(service)
  }
}
