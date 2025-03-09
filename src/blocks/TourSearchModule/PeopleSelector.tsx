import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { UsersRound, Minus, Plus } from 'lucide-react';
import { tv } from 'tailwind-variants';


const MAX_ADULTS_NUMBER = 4;
const MIN_ADULTS_NUMBER = 1;
const MAX_CHILDREN_NUMBER = 3;
const MIN_CHILDREN_NUMBER = 0;


const buttonVariants = tv({
  base: 'bg-jaffa-50 text-jaffa-900 rounded-xl shadow-none cursor-pointer hover:bg-jaffa-100',
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed hover:bg-transparent',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});


type PeopleSelectorProps = {
  childrenNumber: number;
  setChildrenNumber: (number: number) => void;
  adultsNumber: number;
  setAdultsNumber: (number: number) => void;
}

const PeopleSelector = ({ childrenNumber, setChildrenNumber, adultsNumber, setAdultsNumber }: PeopleSelectorProps) => {


  const handleAdultsNumberChange = (number: number): void => {
    if (number >= MIN_ADULTS_NUMBER && number <= MAX_ADULTS_NUMBER) {
      setAdultsNumber(number);
    }
  }

  const handleChildrenNumberChange = (number: number): void => {
    if (number >= MIN_CHILDREN_NUMBER && number <= MAX_CHILDREN_NUMBER) {
      setChildrenNumber(number);
    }
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-jaffa-50 text-jaffa-900 rounded-xl font-bold">
            <UsersRound className="w-4 h-4" />
            {adultsNumber}
            {childrenNumber > 0 && `+${childrenNumber}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-jaffa-50 text-jaffa-900 rounded-xl border-none">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Дорослі:</p>
            <div className="flex items-center gap-2">
              <Button
                className={buttonVariants({ disabled: adultsNumber === MIN_ADULTS_NUMBER })}
                onClick={() => handleAdultsNumberChange(adultsNumber - 1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className='flex justify-center items-center w-4'>{adultsNumber}</span>
              <Button
                className={buttonVariants({ disabled: adultsNumber === MAX_ADULTS_NUMBER })}
                onClick={() => handleAdultsNumberChange(adultsNumber + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Діти:</p>
            <div className="flex items-center gap-2">
              <Button
                className={buttonVariants({ disabled: childrenNumber === MIN_CHILDREN_NUMBER })}
                onClick={(): void => handleChildrenNumberChange(childrenNumber - 1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className='flex justify-center items-center w-4'>{childrenNumber}</span>
              <Button
                className={buttonVariants({ disabled: childrenNumber === MAX_CHILDREN_NUMBER })}
                onClick={(): void => handleChildrenNumberChange(childrenNumber + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default PeopleSelector;
