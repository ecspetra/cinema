import { useEffect, useMemo, useRef, useState } from 'react'

const useReviewCardContentLength = (content: string) => {
	const [contentHeight, setContentHeight] = useState<number>(0)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const isLongReviewContent = useMemo(() => content.length > 400, [content])
	const [isContentOpen, setIsContentOpen] = useState<boolean>(false)
	const [isTruncateReview, setIsTruncateReview] = useState<boolean>(false)
	const isShowTruncateDots =
		isLongReviewContent && !isContentOpen && isTruncateReview

	const toggleReviewContentLength = () => {
		setIsContentOpen(!isContentOpen)
	}

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current!.scrollHeight)
		}

		if (!isContentOpen) {
			setTimeout(() => {
				setIsTruncateReview(true)
			}, 500)
		} else setIsTruncateReview(false)
	}, [isContentOpen])

	return {
		isContentOpen,
		contentHeight,
		contentRef,
		isShowTruncateDots,
		isLongReviewContent,
		toggleReviewContentLength,
	}
}

export default useReviewCardContentLength
