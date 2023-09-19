'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateCourseProps } from '@/models/create-course'
import { TitleFormProps, TitleFormSchema } from '@/models/title-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface TitleFormPageProps {
	initialData: CreateCourseProps
	courseId: string
}

export const TitleForm = ({ initialData, courseId }: TitleFormPageProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const router = useRouter()

	const form = useForm<TitleFormProps>({
		resolver: zodResolver(TitleFormSchema),
		defaultValues: initialData,
	})

	const { isSubmitting, isValid } = form.formState

	const toggleEdit = () => setIsEditing((prev) => !prev)

	const onSubmit: SubmitHandler<TitleFormProps> = async (values) => {
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
				Título do curso
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancelar</>}
					{!isEditing && (
						<>
							<Pencil className="mr-2 h-4 w-4" />
							Editar título
						</>
					)}
				</Button>
			</div>
			{!isEditing && <p className="mt-2 text-sm">{initialData.title}</p>}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-4 space-y-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'Desenvolvimento web avançado'"
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
