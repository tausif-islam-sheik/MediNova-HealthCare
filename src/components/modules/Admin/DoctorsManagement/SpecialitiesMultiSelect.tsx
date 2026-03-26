/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { type ISpeciality } from "@/types/speciality.types";
import { ChevronDown } from "lucide-react";

interface SpecialitiesMultiSelectProps {
  specialities: ISpeciality[];
  selectedSpecialityIds: string[];
  onChange: (nextValue: string[]) => void;
  onBlur: () => void;
  isLoadingSpecialities?: boolean;
  error?: any;
  getErrorMessage: (error: any) => string;
}

const SpecialitiesMultiSelect = ({
  specialities,
  selectedSpecialityIds,
  onChange,
  onBlur,
  isLoadingSpecialities = false,
  error,
  getErrorMessage,
}: SpecialitiesMultiSelectProps) => {
  const selectedTitles = selectedSpecialityIds
    .map((id) => specialities.find((speciality) => speciality.id === id)?.title)
    .filter((title): title is string => Boolean(title));

  const triggerText = isLoadingSpecialities
    ? "Loading specialities..."
    : selectedTitles.length > 0
      ? `${selectedTitles.length} selected`
      : "Select specialities";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label className={cn(error && "text-destructive")}>Specialities</Label>
        {selectedSpecialityIds.length > 0 && (
          <div className="flex flex-wrap justify-end gap-1">
            {selectedSpecialityIds.map((specialityId) => {
              const speciality = specialities.find(
                (item) => item.id === specialityId,
              );

              return speciality ? (
                <Badge key={speciality.id} variant="secondary">
                  {speciality.title}
                </Badge>
              ) : null;
            })}
          </div>
        )}
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-between",
              error && "border-destructive",
            )}
            disabled={isLoadingSpecialities || specialities.length === 0}
          >
            <span className="truncate text-left">{triggerText}</span>
            <ChevronDown className="size-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-(--radix-dropdown-menu-trigger-width) max-h-72 overflow-y-auto"
        >
          {isLoadingSpecialities ? (
            <p className="text-muted-foreground px-2 py-1.5 text-sm">
              Loading specialities...
            </p>
          ) : specialities.length === 0 ? (
            <p className="text-muted-foreground px-2 py-1.5 text-sm">
              No specialities available.
            </p>
          ) : (
            specialities.map((speciality) => {
              const checked = selectedSpecialityIds.includes(speciality.id);

              return (
                <DropdownMenuItem
                  key={speciality.id}
                  className="gap-3"
                  onSelect={(event) => event.preventDefault()}
                  onClick={() => {
                    const nextValue = checked
                      ? selectedSpecialityIds.filter(
                          (item) => item !== speciality.id,
                        )
                      : [...selectedSpecialityIds, speciality.id];

                    onChange(nextValue);

                    onBlur();
                  }}
                >
                  <Checkbox
                    checked={checked}
                    className="pointer-events-none data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                  />
                  <span>{speciality.title}</span>
                </DropdownMenuItem>
              );
            })
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {error ? (
        <p className="text-sm text-destructive">{getErrorMessage(error)}</p>
      ) : null}
    </div>
  );
};

export default SpecialitiesMultiSelect;
