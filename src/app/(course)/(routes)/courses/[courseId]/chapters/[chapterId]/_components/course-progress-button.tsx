'use client'

import axios from 'axios'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'

interface CourseProgressButtonProps {
	chapterId: string
	courseId: string
	isCompleted?: boolean
	nextChapterId?: string
}

export const CourseProgressButton = ({
	chapterId,
	courseId,
	isCompleted,
	nextChapterId,
}: CourseProgressButtonProps) => {
	const router = useRouter()
	const confetti = useConfettiStore()
	const [isLoading, setIsLoading] = useState(false)

	const onClick = async () => {
		try {
			setIsLoading(true)

			await axios.put(
				`/api/courses/${courseId}/chapters/${chapterId}/progress`,
				{
					isCompleted: !isCompleted,
				},
			)

			if (!isCompleted && !nextChapterId) confetti.onOpen()

			if (!isCompleted && nextChapterId)
				router.push(`/courses/${courseId}/chapters/${nextChapterId}`)

			toast.success('Progresso atualizado')
			router.refresh()
		} catch {
			toast.error('Algo deu errado')
		} finally {
			setIsLoading(false)
		}
	}

	const Icon = isCompleted ? XCircle : CheckCircle

	return (
		<Button
			onClick={onClick}
			disabled={isLoading}
			type="button"
			variant={isCompleted ? 'outline' : 'success'}
			className="w-full md:w-auto"
		>
			{isCompleted ? 'Não completo' : 'Marcar como concluído'}
			<Icon className="ml-2 h-4 w-4" />
		</Button>
	)
}