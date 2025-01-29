import { CreateNutritionController } from '@/controllers/nutrition/CreateNutritionController'
import { CreateNutrionService } from 'src/services/nutrition/CreateNutritionService'

export function makeCreateNutritionController() {
  const service = new CreateNutrionService()
  const controller = new CreateNutritionController(service)
  return controller
}
