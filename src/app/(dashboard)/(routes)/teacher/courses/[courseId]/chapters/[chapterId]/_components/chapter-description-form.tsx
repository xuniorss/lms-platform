'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Chapter } from '@prisma/client'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { Editor } from '@/components/Editor'
import { Preview } from '@/components/Preview'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface ChapterDescriptionFormProps {
	initialData: Chapter
	courseId: string
	chapterId: string
}

const formSchema = z.object({
	description: z.string().min(1),
})

export const ChapterDescriptionForm = ({
	initialData,
	courseId,
	chapterId,
}: ChapterDescriptionFormProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const toggleEdit = () => setIsEditing((current) => !current)

	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: initialData?.description || '',
		},
	})

	const { isSubmitting, isValid } = form.formState

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(
				`/api/courses/${courseId}/chapters/${chapterId}`,
				values,
			)
			toast.success('Capítulo atualizado')
			toggleEdit()
			router.refresh()
		} catch {
			toast.error('Algo deu errado')
		}
	}

	return (
		<div className="mt-6 rounded-md border bg-slate-100 p-4">
			<div className="flex items-center justify-between font-medium">
				Descrição do capítulo
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing ? (
						<>Cancelar</>
					) : (
						<>
							<Pencil className="mr-2 h-4 w-4" />
							Edite a Descrição
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<div
					className={cn(
						'mt-2 text-sm',
						!initialData.description && 'italic text-slate-500',
					)}
				>
					{!initialData.description && 'Sem descrição'}
					{initialData.description && (
						<Preview value={initialData.description} />
					)}
				</div>
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
										<Editor {...field} />
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
