import type { JSX, ReactNode } from "react";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";

type SearchTooltipProps = {
  children: ReactNode;
  content: string;
};

const SearchTooltip = ({ children, content }: SearchTooltipProps): JSX.Element => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={600}>
        <TooltipTrigger asChild={true}>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { SearchTooltip };