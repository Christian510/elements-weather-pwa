import { fetchAllData, fetchFavorites } from "./weather_api";

export async function loader() {
    try {
      const data = await fetchFavorites();
      if (!data || typeof data === 'string') {
        return { forecasts: [] };
      }
      const forecasts = await Promise.all(
        data.locations.map(fetchAllData)
      );
      return { forecasts, sessionId: data.session };
    } catch (error) {
      console.error("Error fetching favorites: ", error);
      throw error;
    }
  }