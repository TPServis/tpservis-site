import { useState } from 'react'
import type { JSX } from 'react'
import Image from 'next/image'
import { useCarousel } from '@/hooks/useCarousel'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utilities/cn";
type Props = {
  images: string[]
}

export const HotelGallery = ({ images }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    emblaRef,
    containerRef,
    selectedIndex,
    scrollSnaps,
    canScrollPrev,
    canScrollNext,
    isMobile,
    scrollTo,
    scrollPrev,
    scrollNext,
  } = useCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  })

  const handleToggle = (): void => {
    setIsOpen(!isOpen)
  }

  return (
			<div>
				<button
					type="button"
					className="relative group w-60 cursor-pointer"
					onClick={(): void => handleToggle()}
				>
					{Array.from(images)
						.splice(0, 3)
						.reverse()
						.map((image, index) => (
							<div
								key={image}
								className="border-10 border-white shadow-sm rounded-2xl overflow-hidden not-first:absolute not-first:inset-0 bg-white group-hover:last:-rotate-6 transition origin-top-left group-hover:first:rotate-6 aspect-[4/3]"
							>
								<Image
									src={image}
									alt={`Hotel ${index + 1}`}
									width={300}
									height={200}
									className="w-full h-full object-cover"
								/>
							</div>
						))}
				</button>
				{isOpen && (
					<div
						className="fixed inset-0 bg-black/40 z-1000 flex justify-center items-center backdrop-blur-sm"
						ref={containerRef}
					>
						<button
							type="button"
							className="absolute inset-0 bg-transparent"
							onClick={(): void => handleToggle()}
							aria-label="Close"
						/>

						<button
							type="button"
							className="relative z-10"
							onClick={(): void => scrollPrev()}
							aria-label="Close"
						>
							<ChevronLeft className="w-10 h-10" />
						</button>

						<div className="w-[60vw] h-[80vh]" ref={emblaRef}>
							<div className="flex gap-4">
								{images.map(
									(image, index): JSX.Element => (
										<div
											key={image}
											className={cn(
												"w-full h-auto shrink-0 rounded-2xl overflow-hidden-2xl overflow-hidden shadow-2xl transition-all duration-300",
												index !== selectedIndex && "opacity-70 blur-lg",
											)}
										>
											<Image
												src={image}
												alt={`Hotel ${index + 1}`}
												width={1000}
												height={600}
												className="w-full h-full object-contain"
											/>
										</div>
									),
								)}
							</div>
						</div>

						<button
							type="button"
							className="relative z-10"
							onClick={(): void => scrollNext()}
							aria-label="Close"
						>
							<ChevronRight className="w-10 h-10" />
						</button>
					</div>
				)}
			</div>
		);
}
