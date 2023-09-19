export default function CourseIdPage({
	params,
}: {
	params: { courseId: string }
}) {
	return <div>id page {params.courseId}</div>
}
