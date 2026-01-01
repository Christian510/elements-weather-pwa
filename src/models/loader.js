import { fetchAllData, fetchFavorites } from "./weather_api";
import { fetchAllElmIcons } from "./elmIcons";

export async function loader() {
    try {
      const data = await fetchFavorites();
      if (!data || typeof data === 'string') {
        return { forecasts: [] };
      }
      const forecasts = await Promise.all(
        data.locations.map(fetchAllData)
      );
      const iconValues = await fetchAllElmIcons();
      if (!iconValues || typeof iconValues === 'string') {
        return { iconValues: [] };
      }
      
      return { forecasts, iconValues, sessionId: data.session };

    } catch (error) {
      console.error("Error fetching favorites: ", error);
      throw error;
    }
  }