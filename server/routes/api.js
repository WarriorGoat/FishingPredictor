import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// NOAA Stations endpoint (public, no auth needed)
router.get('/stations', async (req, res, next) => {
  try {
    const response = await fetch(
      'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'
    );

    if (!response.ok) {
      throw new Error(`NOAA API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// NOAA Tides endpoint
router.get('/tides', async (req, res, next) => {
  try {
    const { begin_date, end_date, station } = req.query;

    if (!begin_date || !end_date || !station) {
      return res.status(400).json({
        error: 'Missing required parameters: begin_date, end_date, station'
      });
    }

    const url = new URL('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter');
    url.searchParams.append('begin_date', begin_date);
    url.searchParams.append('end_date', end_date);
    url.searchParams.append('station', station);
    url.searchParams.append('product', 'predictions');
    url.searchParams.append('datum', 'MLLW');
    url.searchParams.append('time_zone', 'lst_ldt');
    url.searchParams.append('interval', 'hilo');
    url.searchParams.append('units', 'english');
    url.searchParams.append('application', 'WarriorGoatFishingPlanner');
    url.searchParams.append('format', 'json');

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NOAA Tides API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Weather.gov endpoint (public, no auth needed)
router.get('/weather', async (req, res, next) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Missing required parameters: lat, lng'
      });
    }

    // First request to get forecast URL
    const pointsResponse = await fetch(
      `https://api.weather.gov/points/${lat},${lng}`
    );

    if (!pointsResponse.ok) {
      throw new Error(`Weather.gov API error: ${pointsResponse.status}`);
    }

    const pointsData = await pointsResponse.json();
    const forecastUrl = pointsData.properties.forecast;

    // Second request to get actual forecast
    const forecastResponse = await fetch(forecastUrl);

    if (!forecastResponse.ok) {
      throw new Error(`Weather forecast API error: ${forecastResponse.status}`);
    }

    const forecastData = await forecastResponse.json();
    res.json(forecastData);
  } catch (error) {
    next(error);
  }
});

// Visual Crossing (moon/sun) endpoint - SECURED with API key
router.get('/astronomy', async (req, res, next) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Missing required parameters: lat, lng'
      });
    }

    const apiKey = process.env.VISUAL_CROSSING_API_KEY;

    if (!apiKey) {
      throw new Error('Visual Crossing API key not configured');
    }

    const url = new URL('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast');
    url.searchParams.append('locations', `${lat},${lng}`);
    url.searchParams.append('aggregateHours', '24');
    url.searchParams.append('forecastDays', '7');
    url.searchParams.append('includeAstronomy', 'true');
    url.searchParams.append('unitGroup', 'us');
    url.searchParams.append('shortColumnNames', 'false');
    url.searchParams.append('locationMode', 'array');
    url.searchParams.append('contentType', 'json');
    url.searchParams.append('key', apiKey);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Visual Crossing API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
