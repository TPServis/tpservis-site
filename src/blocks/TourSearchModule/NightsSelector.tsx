import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Moon } from 'lucide-react';


type NightsSelectorProps = {
  nights: number[]
  setNights: (nights: number[]) => void
}

const NightsSelector = ({ nights, setNights }: NightsSelectorProps) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-jaffa-50 text-jaffa-900 rounded-xl font-bold">
            <Moon className="h-4" />
            {nights[0]}-{nights[1]}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[300px] bg-jaffa-50 text-jaffa-900 rounded-xl border-none"
          align="end"
        >
          <div className="w-full">
            <div className="flex justify-between">
              <h2 className="text-sm font-bold">Ночей в турі:</h2>
              <p className="text-sm font-bold">
                {nights[0]}-{nights[1]}
              </p>
            </div>
            <p className="text-xs opacity-50 max-w-[200px] pb-4">
              Оберіть кількість ночей, які ви хочете провести в турі
            </p>
            <div className="flex justify-between gap-2">
              <p className="text-sm">від</p>
              <Slider
                min={1}
                max={21}
                step={1}
                value={nights}
                onValueChange={(value) => setNights(value)}
              />
              <p className="text-sm">до</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default NightsSelector;
