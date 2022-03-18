import { EntitiesLoadingState } from './api.model'

export interface AirportPublicInfo {
  continent: string
  coordinates: string
  elevation_ft: string
  gps_code: string
  iata_code: string
  ident: string
  iso_country: string
  iso_region: string
  local_code: string
  municipality: string
  name: string
  type: string
}

export type AirportLoadingState = EntitiesLoadingState
