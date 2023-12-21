export const formatReviewTextWithHtmlTags = (reviewText: string) => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(reviewText, 'text/html')

	let formattedText = ''
	for (const element of doc.body.childNodes) {
		if (element.nodeName === 'B') {
			formattedText += `<b class='font-bold'>${element.textContent}</b>`
		} else if (element.nodeName === 'I') {
			formattedText += `<i>${element.textContent}</i>`
		} else if (element.nodeType === 3) {
			formattedText += element.textContent
		}
	}

	return formattedText
}
