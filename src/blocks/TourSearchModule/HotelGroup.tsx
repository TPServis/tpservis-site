import { Button } from "@/components/ui/button";

import { useState } from "react";
import type { JSX } from "react";
import { HotelGallery } from "./HotelGallery";
import * as cheerio from "cheerio";
import RoomCard from "./RoomCard";
import { Stars } from "./Stars";
import { useITTourRequest } from "./utils";
import type { Form } from "@/payload-types";
import type { TourSearchResultType } from "./types";
export const HotelGroup = ({
	hotel,
	form,
}: { hotel: TourSearchResultType; form: Form }): JSX.Element => {
	const roomsToShow: number = 6;
	const [visibleRooms, setVisibleRooms] = useState<number>(roomsToShow);
	const hasMoreRooms = hotel.rooms.length > visibleRooms;

	const images: string[] = [];

	const handleShowMore = (): void => {
		setVisibleRooms((prev) => prev + roomsToShow);
	};

	// getting images for the gallery
	const tour = useITTourRequest(hotel.rooms[0].id);
	console.log(tour.data);
	if (tour.data) {
		const $ = cheerio.load(tour.data.text);

		$("#gallery_big_img_tour img.gallery_big_img_tour_item").map((_, el) => {
			const image = $(el).attr("src");
			if (image) {
				images.push(image);
			}
		});
	}

	function getRoomPluralForm(roomCount: number): string {
		if (roomCount === 1) {
			return "номер";
		}
		if (roomCount >= 2 && roomCount <= 4) {
			return "номери";
		}
		return "номерів";
	}

	return (
		<div className="mt-20">
			<div className="mb-4">
				<div className="flex gap-4 items-center">
					<HotelGallery images={images} />
					<div>
						<div>
							<h2 className="text-2xl lg:text-4xl font-bold text-astral-800 text-balance">
								{hotel.title}
								<div className="inline-block ml-2 align-middle">
									<Stars number={hotel.stars} />
								</div>
							</h2>
						</div>
						<div className="flex items-center gap-2 text-shark-500">
							<p>{hotel.location}</p>
							<span className="w-1 h-1 rounded-full bg-shark-300" />
							<p className="text-sm">
								{hotel.rooms.length} {getRoomPluralForm(hotel.rooms.length)}
								знайдено
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-4">
				{hotel.rooms.slice(0, visibleRooms).map((room) => (
					<RoomCard key={room.id} room={room} hotel={hotel} form={form} />
				))}
			</div>
			{hasMoreRooms && (
				<div className="mt-8 flex justify-center">
					<Button
						onClick={handleShowMore}
						variant="outline"
						className="bg-astral-50 hover:bg-astral-100 text-astral-900"
					>
						Показати ще {Math.min(6, hotel.rooms.length - visibleRooms)} номерів
					</Button>
				</div>
			)}
		</div>
	);
};