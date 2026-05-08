import { fetchAllData, fetchFavorites } from "./weather_api";
import { fetchAllElmIcons } from "./elmIcons";

const emptyResult = { forecasts: [], iconValues: { icons: [] }, sessionId: null };

export async function loader() {
    try {
      const data = await fetchFavorites();
      if (!data || typeof data === 'string') {
        return emptyResult;
      }
      const forecasts = await Promise.all(
        data.locations.map(fetchAllData)
      );
      const iconValues = await fetchAllElmIcons();
      if (!iconValues || typeof iconValues === 'string') {
        return { ...emptyResult, forecasts, sessionId: data.session };
      }
      return { forecasts, iconValues, sessionId: data.session };
    } catch (error) {
      console.error("Error fetching favorites: ", error);
      return emptyResult;
    }
  }