'use client'

import { Course } from '@prisma/client'
import axios from 'axios'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { FileUpload } from '@/components/FileUpload'
import { Button } from '@/components/ui/button'

interface ImageFormProps {
	initialData: Course
	courseId: string
}

const formSchema = z.object({
	imageUrl: z.string().min(1, {
		message: 'Image is required',
	}),
})

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const toggleEdit = () => setIsEditing((current) => !current)

	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}`, values)
			toast.success('Curso atualizado')
			toggleEdit()
			router.refresh()
		} catch {
			toast.error('Algo deu errado')
		}
	}

	return (
		<div className="mt-6 rounded-md border bg-slate-100 p-4">
			<div className="flex items-center justify-between font-medium">
				Imagem do curso
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancelar</>}
					{!isEditing && !initialData.imageUrl && (
						<>
							<PlusCircle className="mr-2 h-4 w-4" />
							Adicione uma imagem
						</>
					)}
					{!isEditing && initialData.imageUrl && (
						<>
							<Pencil className="mr-2 h-4 w-4" />
							Editar imagem
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData.imageUrl ? (
					<div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
						<ImageIcon className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative mt-2 aspect-video">
						<Image
							alt="Upload"
							fill
							className="rounded-md object-cover"
							src={initialData.imageUrl}
						/>
					</div>
				))}
			{isEditing && (
				<div>
					<FileUpload
						endpoint="courseImage"
						onChange={(url) => {
							if (url) {
								onSubmit({ imageUrl: url })
							}
						}}
					/>
					<div className="mt-4 text-xs text-muted-foreground">
						16:9 aspect ratio recomendado
					</div>
				</div>
			)}
		</div>
	)
}
