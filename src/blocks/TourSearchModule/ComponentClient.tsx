"use client";
import type { Form } from "@/payload-types";
import { Loader2, MapPin, Plane } from "lucide-react";
// biome-ignore lint: library choice
import type { JSX } from "react/jsx-runtime";
import { NightsSelector } from "./NightsSelector";
import PeopleSelector from "./PeopleSelector";
import TransportSelector from "./TransportSelector";
import { HotelGroup } from "./HotelGroup";
import { SearchModule } from "./SearchModule";
import { SearchSelectField } from "./SearchSelectField";
import { DatePopover } from "./DatePopover";
import { SearchTooltip } from "./SearchTooltip";
import { useSearch } from "./hooks/useSearch";
import type { TourSearchResultType } from "./types";

export const TourSearchModule = ({ form }: { form: Form }): JSX.Element => {
  const { setters, getters, runSearch } = useSearch();

  const handleRunSearch = (): void => {
    runSearch();
  };

  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper min-h-[300px] relative">
        <SearchModule runSearch={handleRunSearch}>
          <>
            <div className="col-span-3">
              <SearchTooltip content="Оберіть тип транспорту">
                <TransportSelector
                  transportType={getters.transportType}
                  setTransportType={setters.setTransportType}
                />
              </SearchTooltip>
            </div>
            <div className="col-span-9 w-full">
              <SearchTooltip content="Оберіть країну призначення">
                <SearchSelectField
                  options={getters.parsedCountries}
                  selectedOption={getters.selectedCountry || ""}
                  setSelectedOption={setters.setSelectedCountry}
                  isLoadingOptions={getters.isLoadingCountries}
                  icon={<Plane className="h-4" />}
                />
              </SearchTooltip>
            </div>
            <div className="col-span-12 w-full">
              <SearchTooltip content="Оберіть місто відправлення">
                <SearchSelectField
                  options={getters.parsedDepartureCities}
                  selectedOption={getters.selectedDepartureCity || ""}
                  setSelectedOption={setters.setSelectedDepartureCity}
                  isLoadingOptions={getters.isLoadingDepartureCities}
                  icon={<MapPin className="h-4" />}
                />
              </SearchTooltip>
            </div>
            <div className="grid gap-2 col-span-12 w-full">
              <SearchTooltip content="Оберіть бажаний діапазон дат вильоту">
                <DatePopover date={getters.date} setDate={setters.setDate} />
              </SearchTooltip>
            </div>
            <div className="col-span-6">
              <SearchTooltip content="Оберіть кількість ночей">
                <NightsSelector nights={getters.nights} setNights={setters.setNights} />
              </SearchTooltip>
            </div>
            <div className="col-span-6">
              <SearchTooltip content="Оберіть кількість дорослих та дітей">
                <PeopleSelector
                  childrenNumber={getters.childrenNumber}
                  setChildrenNumber={setters.setChildrenNumber}
                  adultsNumber={getters.adultsNumber}
                  setAdultsNumber={setters.setAdultsNumber}
                />
              </SearchTooltip>
            </div>
          </>
        </SearchModule>

        {(getters.isLoadingResults ||
          (getters.tourSearchData && getters.tourSearchData.length > 0)) && (
          <div className="">
            <div className="flex items-center gap-4">
              <p className="text-sm text-shark-500">
                {getters.isLoadingResults ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Знайдено {getters.loadedResults} варіантів...
                  </span>
                ) : (
                  `${calcRoomsNumber(getters.tourSearchData)} номерів знайдено`
                )}
              </p>
            </div>
            {!getters.isLoadingResults &&
              getters.tourSearchData &&
              getters.tourSearchData.map((hotel: TourSearchResultType) => (
                <HotelGroup key={hotel.title} hotel={hotel} form={form} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const calcRoomsNumber = (results: TourSearchResultType[] | null): number => {
  if (!results) {
    return 0;
  }
  let totalRooms = 0;
  for (const hotel of results) {
    totalRooms += hotel.rooms.length;
  }
  return totalRooms;
};

