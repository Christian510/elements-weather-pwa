import React from "react";
import "./WeatherIcon.css";
import { weatherIcons } from "../../models/icon_map";

export interface WeatherIconProps {
    isday: boolean;
    icon: string;
    description: string;
}

export default function WeatherIcon({ isday=true, icon="skc", description="Fair/clear" }: WeatherIconProps) {

    const iconMap = weatherIcons.find((w) => w.icon === icon);
    const iconMatch = isday ? iconMap?.reactIcon.day : iconMap?.reactIcon.night;

    return (
        <div>
            <i className={`wi ${iconMatch}`} ></i>
        </div>
    );
};