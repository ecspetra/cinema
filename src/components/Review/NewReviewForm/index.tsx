import React, { useState } from 'react';
import Textarea from "../../../app/components/UI/Input/Textarea/index";
import Title from "../../../app/components/UI/Title/Title";
import Button from "../../../app/components/UI/Button/index";

const NewReviewForm = () => {
	const [textareaValue, setTextareaValue] = useState<string>('');

	const handleTextareaChange = (newValue) => {
		setTextareaValue(newValue);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Title>Leave your review</Title>
			<form onSubmit={handleSubmit}>
				<Textarea onChange={handleTextareaChange} />
				<Button type="submit" className="mt-8">Submit review</Button>
			</form>
		</>
	);
};

export default NewReviewForm;
