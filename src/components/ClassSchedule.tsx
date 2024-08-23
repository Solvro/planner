import React from "react";
import { ClassBlockProps } from "@/lib/types";
import { ClassBlock } from "./ClassBlock";
import { Hour } from "./Hour";
import { extendedCourse, extendedGroup } from "@/pages/createplan";

const upperHours = [
  "7:30",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "16:55",
  "17:50",
  "18:45",
  "19:40",
  "20:45",
  "21:40",
] as const;

const bottomHours = [
  "8:15",
  "9:15",
  "10:15",
  "11:15",
  "12:15",
  "13:15",
  "14:15",
  "15:15",
  "16:10",
  "17:05",
  "18:00",
  "18:55",
  "19:50",
  "20:55",
  "21:50",
] as const;

const ClassSchedule = ({
  schedule,
  day,
  courses,
  groups,
  onClick,
}: {
  schedule: ClassBlockProps[];
  day: string;
  courses: extendedCourse[];
  groups: extendedGroup[];
  onClick: (id: string) => void;
}) => {
  return (
    <div>
      <div className="flex justify-center items-center text-2xl font-semibold relative z-20 bg-white">
        {day}
      </div>
      <div className="flex flex-col text-[9px]">
        <div className="grid grid-cols-dayPlan min-w-[1400px] px-[10px]">
          {upperHours.map((hour, index) => (
            <Hour hour={hour} key={index} />
          ))}
          {bottomHours.map((hour, index) => (
            <Hour hour={hour} key={index} />
          ))}
        </div>
        <div className="grid grid-cols-dayPlan grid-flow-col min-w-[1400px] gap-y-3 px-[10px] py-5">
          {schedule.map((block, index) => (
            <ClassBlock key={index} {...block} courses={courses} groups={groups} onClick={onClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ClassSchedule };
