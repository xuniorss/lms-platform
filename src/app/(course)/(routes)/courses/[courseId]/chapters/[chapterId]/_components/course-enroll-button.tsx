'use client'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'

interface CourseEnrollButtonProps {
	price: number
	courseId: string
}

export const CourseEnrollButton = ({
	price,
	courseId,
}: CourseEnrollButtonProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const onClick = async () => {
		try {
			setIsLoading(true)

			const response = await axios.post(`/api/courses/${courseId}/checkout`)

			window.location.assign(response.data.url)
		} catch {
			toast.error('Algo deu errado')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button
			onClick={onClick}
			disabled={isLoading}
			size="sm"
			className="w-full md:w-auto"
		>
			Inscreva-se por {formatPrice(price)}
		</Button>
	)
}
