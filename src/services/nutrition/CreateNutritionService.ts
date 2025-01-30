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
      `Crie uma dieta completa para uma pessoa com nome: ${data.name} do sexo 
      ${data.gender} com peso atual: ${data.weight}kg, altura: ${data.height}, 
      idade: ${data.age} anos e com foco e objetivo em ${data.objective}, 
      atualmente nível de atividade: ${data.level} 
      e ignore qualquer outro parametro que não seja os passados, 
      retorne em json com as respectivas propriedades, 
      propriedade nome o nome da pessoa, propriedade sexo com sexo, 
      propriedade idade, propriedade altura, propriedade peso, 
      propriedade objetivo com o objetivo atual, 
      propriedade refeições com uma array contendo dentro cada objeto sendo 
      uma refeição da dieta e dentro de cada refeição a propriedade horário 
      com horário da refeição, propriedade nome com nome e a propriedade alimentos 
      com array contendo os alimentos dessa refeição e pode incluir uma propreidade como 
      suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o 
      objetivo dela e não retorne nenhuma observação alem das passadas no prompt, 
      retorne em json e nenhuma propriedade pode ter acento.`
    )

    if (response.response?.candidates) {
      const jsonText = response.response.candidates[0].content.parts[0]
        .text as string

      const jsonString = jsonText
        .replace(/```\w*\n/g, '')
        .replace(/\n```/g, '')
        .trim()

      const jsonObject = JSON.parse(jsonString)

      return {
        data: jsonObject,
      }
    }

    return {
      ok: true,
    }
  }
}
