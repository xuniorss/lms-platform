'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { CreateCourseProps, CreateCourseSchema } from '@/models/create-course'
import { zodResolver } from '@hookform/resolvers/zod'
import { Course } from '@prisma/client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreatePage() {
	const [isFocused, setIsFocused] = useState(false)
	const router = useRouter()

	const form = useForm<CreateCourseProps>({
		resolver: zodResolver(CreateCourseSchema),
		defaultValues: { title: '' },
	})

	const { isSubmitting, isValid } = form.formState

	const onSubmit: SubmitHandler<CreateCourseProps> = async (values) => {
		try {
			const { data } = await axios.post<Course>('/api/courses', values)
			router.push(`/teacher/courses/${data.id}`)
			toast.success('Curso criado')
		} catch (error) {
			toast.error('Algo deu errado')
		}
	}

	return (
		<section className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
			<div>
				<h1 className="text-2xl">Dê um nome ao seu curso</h1>
				<p className="text-sm text-slate-600">
					Como você gostaria de nomear seu curso? Não se preocupe, você
					pode alterar isso mais tarde.
				</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-8 space-y-8"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Título do curso</FormLabel>
									<FormControl
										className={cn(
											'relative',
											isFocused ? 'w-full' : 'w-3/4',
										)}
									>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'Desenvolvimento web avançado'"
											onFocus={() => setIsFocused(true)}
											onBlur={() => setIsFocused(false)}
											ref={field.ref}
											name={field.name}
											value={field.value}
											onChange={field.onChange}
											className={cn(
												'transition-all duration-300',
												isFocused ? 'w-full' : 'w-3/4',
											)}
										/>
									</FormControl>
									<FormDescription>
										O que você vai ensinar neste curso?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center gap-x-2">
							<Link href="/">
								<Button
									disabled={isSubmitting}
									type="button"
									variant="ghost"
								>
									Cancelar
								</Button>
							</Link>
							<Button type="submit" disabled={!isValid || isSubmitting}>
								Continuar
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</section>
	)
}
