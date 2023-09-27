'use client'

import MuxPlayer from '@mux/mux-player-react'
import { Chapter, MuxData } from '@prisma/client'
import axios from 'axios'
import { Pencil, PlusCircle, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { FileUpload } from '@/components/FileUpload'
import { Button } from '@/components/ui/button'

interface ChapterVideoFormProps {
	initialData: Chapter & { muxData?: MuxData | null }
	courseId: string
	chapterId: string
}

const formSchema = z.object({
	videoUrl: z.string().min(1),
})

export const ChapterVideoForm = ({
	initialData,
	courseId,
	chapterId,
}: ChapterVideoFormProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const toggleEdit = () => setIsEditing((current) => !current)

	const router = useRouter()

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
				Vídeo do capítulo
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancelar</>}
					{!isEditing && !initialData.videoUrl && (
						<>
							<PlusCircle className="mr-2 h-4 w-4" />
							Adicionar um vídeo
						</>
					)}
					{!isEditing && initialData.videoUrl && (
						<>
							<Pencil className="mr-2 h-4 w-4" />
							Editar vídeo
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData.videoUrl ? (
					<div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
						<Video className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative mt-2 aspect-video">
						<MuxPlayer
							playbackId={initialData?.muxData?.playbackId || ''}
						/>
					</div>
				))}
			{isEditing && (
				<div>
					<FileUpload
						endpoint="chapterVideo"
						onChange={(url) => {
							if (url) {
								onSubmit({ videoUrl: url })
							}
						}}
					/>
					<div className="mt-4 text-xs text-muted-foreground">
						Carregue o vídeo deste capítulo
					</div>
				</div>
			)}
			{initialData.videoUrl && !isEditing && (
				<div className="mt-2 text-xs text-muted-foreground">
					Os vídeos podem levar alguns minutos para serem processados.
					Atualize a página se o vídeo não aparecer.
				</div>
			)}
		</div>
	)
}
