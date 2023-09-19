import { z } from 'zod'

export const CreateCourseSchema = z.object({
	title: z.string().min(1, { message: 'Curso é obrigatório.' }),
})

export type CreateCourseProps = z.infer<typeof CreateCourseSchema>
