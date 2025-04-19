import { useState } from 'react';
import type { JSX } from 'react';

type Props = {
	images: string[];
};

export const HotelGallery = ({ images }: Props): JSX.Element => {
	const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

	return (
		<div>
			{images.map((image, index) => (
				<img key={image} src={image} alt={`Hotel ${index + 1}`} />
			))}
			{activeImageIndex !== null && (
				<div className='modal'>
					<img
						src={images[activeImageIndex]}
						alt={`Hotel ${activeImageIndex + 1}`}
					/>
					<button type='button' onClick={(): void => setActiveImageIndex(null)}>
						Close
					</button>
				</div>
			)}
		</div>
	);
};
