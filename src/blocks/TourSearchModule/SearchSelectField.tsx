import type { JSX, ReactNode } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utilities/cn";
import type { Option } from "./utils";

type SearchSelectFieldProps = {
	options: Option[];
	selectedOption: string;
	setSelectedOption: (option: string) => void;
	isLoadingOptions: boolean;
	icon: ReactNode;
};

const SearchSelectField = ({
	options,
	selectedOption,
	setSelectedOption,
	isLoadingOptions,
	icon,
}: SearchSelectFieldProps): JSX.Element => {
	return (
		<Select value={selectedOption || ""} onValueChange={setSelectedOption}>
			<SelectTrigger className="w-full border-none bg-jaffa-50  text-jaffa-900 font-bold rounded-xl">
				<div
					className={cn("flex gap-2 items-center transition-all duration-100", {
						"blur-sm": isLoadingOptions,
					})}
				>
					{icon}
					<SelectValue placeholder="Select a country" />
				</div>
			</SelectTrigger>
			<SelectContent className="bg-jaffa-50 text-jaffa-900 rounded-2xl border-none">
				{options?.map((option: Option) => (
					<SelectItem
						key={option.id}
						value={option.id}
						className={cn("hover:bg-jaffa-100 rounded-xl", {
							"bg-jaffa-200 font-bold hover:bg-jaffa-400": selectedOption === option.id,
						})}
					>
						{option.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export { SearchSelectField };
