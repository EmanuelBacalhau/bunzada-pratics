import { env } from '@/env/index'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface IRequest {
  name: string
  weight: number
  height: number
  age: number
  objective: string
  level: string
  gender: string
}

export class CreateNutrionService {
  async execute(data: IRequest) {
    const genAi = new GoogleGenerativeAI(env.GEMINI_API_KEY)
    const model = genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
    })

    const response = await model.generateContent(
      'Em que ano o javascript foi criado?'
    )

    console.log(JSON.stringify(response, null, 2))

    return {
      ok: true,
    }
  }
}
