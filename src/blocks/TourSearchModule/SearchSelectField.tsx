import type { JSX } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/utilities/cn";
import type { Option } from "./utils";

type SearchSelectFieldProps = {
	options: Option[];
	selectedOption: string;
	setSelectedOption: (option: string) => void;
	isLoadingOptions: boolean;
	icon: React.ReactNode;
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
			<TooltipProvider>
				<Tooltip delayDuration={600}>
					<TooltipTrigger asChild={true}>
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
					</TooltipTrigger>
					<TooltipContent
						className="bg-jaffa-50 text-jaffa-900 rounded-lg border-none font-bold text-sm"
						sideOffset={8}
					>
						<p>Оберіть країну призначення</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
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
