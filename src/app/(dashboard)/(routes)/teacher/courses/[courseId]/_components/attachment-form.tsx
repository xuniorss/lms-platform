'use client'

import { Attachment, Course } from '@prisma/client'
import axios from 'axios'
import { File, Loader2, PlusCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { FileUpload } from '@/components/FileUpload'
import { Button } from '@/components/ui/button'

interface AttachmentFormProps {
	initialData: Course & { attachments: Attachment[] }
	courseId: string
}

const formSchema = z.object({
	url: z.string().min(1),
})

export const AttachmentForm = ({
	initialData,
	courseId,
}: AttachmentFormProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [deletingId, setDeletingId] = useState<string | null>(null)

	const toggleEdit = () => setIsEditing((current) => !current)

	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post(`/api/courses/${courseId}/attachments`, values)
			toast.success('Curso atualizado')
			toggleEdit()
			router.refresh()
		} catch {
			toast.error('Algo deu errado')
		}
	}

	const onDelete = async (id: string) => {
		try {
			setDeletingId(id)
			await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
			toast.success('Anexo excluído')
			router.refresh()
		} catch {
			toast.error('Algo deu errado')
		} finally {
			setDeletingId(null)
		}
	}

	return (
		<div className="mt-6 rounded-md border bg-slate-100 p-4">
			<div className="flex items-center justify-between font-medium">
				Anexos do curso
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancel</>}
					{!isEditing && (
						<>
							<PlusCircle className="mr-2 h-4 w-4" />
							Adicionar um arquivo
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<>
					{initialData.attachments.length === 0 && (
						<p className="mt-2 text-sm italic text-slate-500">
							Ainda não há anexos
						</p>
					)}
					{initialData.attachments.length > 0 && (
						<div className="space-y-2">
							{initialData.attachments.map((attachment) => (
								<div
									key={attachment.id}
									className="flex w-full items-center rounded-md border border-sky-200 bg-sky-100 p-3 text-sky-700"
								>
									<File className="mr-2 h-4 w-4 flex-shrink-0" />
									<p className="line-clamp-1 text-xs">
										{attachment.name}
									</p>
									{deletingId === attachment.id && (
										<div>
											<Loader2 className="h-4 w-4 animate-spin" />
										</div>
									)}
									{deletingId !== attachment.id && (
										<button
											aria-label="button remove attachment"
											onClick={() => onDelete(attachment.id)}
											className="ml-auto transition hover:opacity-75"
										>
											<X className="h-4 w-4" />
										</button>
									)}
								</div>
							))}
						</div>
					)}
				</>
			)}
			{isEditing && (
				<div>
					<FileUpload
						endpoint="courseAttachment"
						onChange={(url) => {
							if (url) {
								onSubmit({ url })
							}
						}}
					/>
					<div className="mt-4 text-xs text-muted-foreground">
						Adicione tudo o que seus alunos possam precisar para concluir
						o curso.
					</div>
				</div>
			)}
		</div>
	)
}
