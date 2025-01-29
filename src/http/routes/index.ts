import { makeCreateNutritionController } from '@/controllers/factories/nutrition/makeCraeteNutritionController'
import type { FastifyInstance } from 'fastify'

export function routes(app: FastifyInstance) {
  const createNutritionController = makeCreateNutritionController()

  app.post('/', createNutritionController.handle)
}
