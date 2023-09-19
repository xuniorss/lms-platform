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
import { CreateCourseProps, CreateCourseSchema } from '@/models/create-course'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function CreatePage() {
	const router = useRouter()

	const form = useForm<CreateCourseProps>({
		resolver: zodResolver(CreateCourseSchema),
		defaultValues: { title: '' },
	})

	const { isSubmitting, isValid } = form.formState

	const onSubmit: SubmitHandler<CreateCourseProps> = async (values) => {
		try {
			const { data } = await axios.post('/api/course', values)
			router.push(`/teacher/course/${data.id}`)
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
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'Desenvolvimento web avançado'"
											{...field}
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
								<Button type="button" variant="ghost">
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
