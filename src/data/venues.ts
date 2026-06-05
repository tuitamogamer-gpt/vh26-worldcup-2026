import type { Venue } from '../types'

// 16 host stadiums across USA, Mexico and Canada.
// `city` matches the city label used in the official match schedule.
// `utcOffset` is the offset in effect during the tournament (mid-June to mid-July,
// i.e. DST active in USA/Canada; Mexico has no DST).
export const venues: Venue[] = [
  // Mexico (CST, no DST → -6)
  { id: 'azteca',    stadium: 'Estadio Azteca',          city: 'Mexico City',     region: 'Ciudad de México', country: 'Mexico', capacity: 83264, utcOffset: -6 },
  { id: 'akron',     stadium: 'Estadio Akron',           city: 'Zapopan',         region: 'Guadalajara',      country: 'Mexico', capacity: 48071, utcOffset: -6 },
  { id: 'bbva',      stadium: 'Estadio BBVA',            city: 'Guadalupe',       region: 'Monterrey',        country: 'Mexico', capacity: 53500, utcOffset: -6 },
  // Canada
  { id: 'bmo',       stadium: 'BMO Field',               city: 'Toronto',         region: 'Toronto',          country: 'Canada', capacity: 45736, utcOffset: -4 },
  { id: 'bcplace',   stadium: 'BC Place',                city: 'Vancouver',       region: 'Vancouver',        country: 'Canada', capacity: 54500, utcOffset: -7 },
  // USA
  { id: 'att',       stadium: 'AT&T Stadium',            city: 'Arlington',       region: 'Dallas',           country: 'USA', capacity: 94000, utcOffset: -5 },
  { id: 'metlife',   stadium: 'MetLife Stadium',         city: 'East Rutherford', region: 'New York / NJ',    country: 'USA', capacity: 82500, utcOffset: -4 },
  { id: 'mercedes',  stadium: 'Mercedes-Benz Stadium',   city: 'Atlanta',         region: 'Atlanta',          country: 'USA', capacity: 75000, utcOffset: -4 },
  { id: 'arrowhead', stadium: 'Arrowhead Stadium',       city: 'Kansas City',     region: 'Kansas City',      country: 'USA', capacity: 76416, utcOffset: -5 },
  { id: 'nrg',       stadium: 'NRG Stadium',             city: 'Houston',         region: 'Houston',          country: 'USA', capacity: 72220, utcOffset: -5 },
  { id: 'levis',     stadium: "Levi's Stadium",          city: 'Santa Clara',     region: 'San Francisco Bay',country: 'USA', capacity: 70909, utcOffset: -7 },
  { id: 'sofi',      stadium: 'SoFi Stadium',            city: 'Inglewood',       region: 'Los Angeles',      country: 'USA', capacity: 70240, utcOffset: -7 },
  { id: 'linc',      stadium: 'Lincoln Financial Field', city: 'Philadelphia',    region: 'Philadelphia',     country: 'USA', capacity: 69596, utcOffset: -4 },
  { id: 'lumen',     stadium: 'Lumen Field',             city: 'Seattle',         region: 'Seattle',          country: 'USA', capacity: 68740, utcOffset: -7 },
  { id: 'gillette',  stadium: 'Gillette Stadium',        city: 'Foxborough',      region: 'Boston',           country: 'USA', capacity: 65878, utcOffset: -4 },
  { id: 'hardrock',  stadium: 'Hard Rock Stadium',       city: 'Miami Gardens',   region: 'Miami',            country: 'USA', capacity: 65326, utcOffset: -4 },
]

export const venueById: Record<string, Venue> = Object.fromEntries(
  venues.map((v) => [v.id, v]),
)
