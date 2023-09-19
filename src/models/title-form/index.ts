import { z } from 'zod'

export const TitleFormSchema = z.object({
	title: z.string().min(1, { message: 'Título é obrigatório.' }),
})

export type TitleFormProps = z.infer<typeof TitleFormSchema>
