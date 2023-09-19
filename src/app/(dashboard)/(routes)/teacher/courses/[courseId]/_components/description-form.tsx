'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface DescriptionFormPageProps {
	initialData: Course
	courseId: string
}

const formSchema = z.object({
	description: z.string().min(1, { message: 'Campo obrigatório' }),
})

type FormProps = z.infer<typeof formSchema>

export const DescriptionForm = ({
	initialData,
	courseId,
}: DescriptionFormPageProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const router = useRouter()

	const form = useForm<FormProps>({
		resolver: zodResolver(formSchema),
		defaultValues: { description: initialData?.description || '' },
	})

	const { isSubmitting, isValid } = form.formState

	const toggleEdit = () => setIsEditing((prev) => !prev)

	const onSubmit: SubmitHandler<FormProps> = async (values) => {
		try {
			await axios.patch(`/api/courses/${courseId}`, values)
			toast.success('Curso atualizado')
			toggleEdit()
			router.refresh()
		} catch (error) {
			console.error(error)
			toast.error('Algo deu errado')
		}
	}

	return (
		<div className="mt-6 rounded-md border bg-slate-100 p-4">
			<div className="flex items-center justify-between font-medium">
				Descrição do curso
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancelar</>}
					{!isEditing && (
						<>
							<Pencil className="mr-2 h-4 w-4" />
							Editar descrição
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<p
					className={cn(
						'mt-2 text-sm',
						!initialData.description && 'italic text-slate-500',
					)}
				>
					{initialData.description || 'Sem descrição'}
				</p>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-4 space-y-4"
					>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											disabled={isSubmitting}
											placeholder="e.g. 'Este curso é sobre...'"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button disabled={!isValid || isSubmitting} type="submit">
								Salvar
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	)
}
