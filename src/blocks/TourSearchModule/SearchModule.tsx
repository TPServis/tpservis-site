import React, { type JSX } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
	children: JSX.Element;
	runSearch: () => void;
};

const SearchModule = ({ children, runSearch }: Props): JSX.Element => {
	return (
		<div className="w-full h-[300px] relative mb-40">
			<div className="w-full h-full overflow-hidden rounded-4xl">
				<Image
					src="https://o0z4coknhf.ufs.sh/f/UucILLerskLA60WL4Z0DxYO4iVTzFcfGgbECp9eH6Z8yrIAn"
					alt="ITTour"
					className="w-full h-full object-cover"
					width={1920}
					height={1080}
					priority={true}
				/>
			</div>
			<div className="grid grid-cols-12 lg:flex gap-1.5 bg-jaffa-400 p-4 rounded-3xl w-full md:w-[calc(100%-2rem)] mx-auto -translate-y-1/2">
				{children}

				<Button
					className="rounded-xl bg-jaffa-900 text-jaffa-50 col-span-12 font-bold"
					onClick={runSearch}
				>
					Знайти тури
				</Button>
			</div>
		</div>
	);
};

export { SearchModule };
