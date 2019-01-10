declare module 'react-native-algolia-places' {
    import * as React from 'react';

    type PlacesProperties = {
        appId: string,
        appKey: string
    } & Partial<DefaultProperties>

    type DefaultProperties = {
        itemList: (item: Hit, i: number, text: string) => React.ReactNode
        options: Partial<PlacesOptions>,
        onSearchError: (err: any) => void;
    }

    type SearchType = "city" | "country" | "address" | "busStop" | "trainStation" | "townhall" | "airport";

    interface HighlightResult {
        administrative: Array<Highlight>;
        country: Array<Highlight> | HighlightTraduction;
        county: Array<Highlight> | HighlightTraduction;
        locale_names: Array<Highlight> | HighlightTraduction;
        postcode: Array<Highlight> | HighlightTraduction;
    }

    interface Highlight {
        fullyHighlighted: boolean;
        matchedWords: Array<string>;
        matchLevel: string;
        value: string;
    }

    interface GeoLoc {
        lat: number;
        lng: number;
    }

    interface HighlightTraduction extends Traduction<Array<Highlight>> {}

    interface LocalNamesTraduction extends Traduction<Array<string>> {}

    interface CountryTraduction extends Traduction<string>{}

    interface Traduction<T> {
        ar: T;
        de: T;
        default: T;
        en: T;
        es: T;
        fr: T;
        hu: T;
        it: T;
        ja: T;
        nl: T;
        pl: T;
        pt: T;
        ro: T;
        ru: T;
        zh: T;
    }

    interface Hit {
        /**
         * List of names of the place. If no language parameter is specified, retrieves all of them.
         * 
         * Examples:
         * - Paris
         * - 589 Howard Street
         */
        locale_names: Array<string> | LocalNamesTraduction;

        /**
         * List of the associated city names. If no language parameter is specified, retrieves all of them.
         */
        city: Array<string>;

        /**
         * List of the associated county names. If no language parameter is specified, retrieves all of them.
         */
        county: Array<string>;

        /**
         * List of associated administrative region names.
         * 
         * Examples:
         * - Pays de la Loire
         * - Texas
         * - Catalunya
         */
        administrative: Array<string>;

        /**
         * Associated country name.
         */
        country: string | CountryTraduction;

        /**
         * Two letters country code (ISO 639-1).
         */
        country_code: string;

        /**
         * List of associated postcodes.
         */
        postcode: Array<string>;

        /**
         * Associated population.
         */
        population: number;

        /**
         * Associated list of latitude and longitude.
         * 
         * Examples:
         * 
         * [{lat: 48.797885, lng: 2.337034}]
         */
        _geoloc: GeoLoc;

        /**
         * The associated highlighting information.
         */
        _highlightResult: HighlightResult;
        _tags: Array<string>;
        admin_level: number;
        importance: number;
        is_city: boolean;
        is_country: boolean;
        is_highway: boolean;
        is_popular: boolean;
        is_suburb: boolean;
        objectID: string;
    }

    /**
     * The available query parameters you can use to filter your search results.
     */
    type PlacesOptions = {
        /**
         * If specified, restrict the search results to a single language. You can pass two letters country codes (ISO 639-1).
         * 
         * Warning: language parameter is case sensitive and should be lowercase otherwise it will fallback to default language.
         */
        language: string,

        /**
         * If specified, restrict the search results to a specific list of comma-separated countries. You can pass two letters country codes (ISO 3166-1).
         * 
         * Default: Search on the whole planet.
         * 
         * Warning: country codes must be lower-cased.
         */
        countries: string,

        /**
         * Specifies how many results you want to retrieve per search.
         * 
         * Default: 20.
         */
        hitsPerPage: number,
        /**
         * Restrict the search results to a specific type.
         * 
         * Available types:
         * - city
         * - country
         * - address
         * - busStop
         * - trainStation
         * - townhall
         * - airport
         * 
         * Default: Search in all types.
         * 
         * Note: If you restrict the search to city or airport, you probably want to disable the aroundLatLngViaIP option as well.
         * This will make sure you don't get only nearby results.
         */
        type: SearchType,

        /**
         * Force to first search around a specific latitude longitude.
         * The option value must be provided as a string: latitude,longitude like 12.232,23.1.
         * 
         * The default is to search around the location of the user determined via his IP address (geoip).
         */
        aroundLatLng: string,

        /**
         * Whether or not to first search around the geolocation of the user found via his IP address.
         * This is true by default.
         */
        aroundLatLngViaIP: boolean,

        /**
         * Radius in meters to search around the latitude longitude.
         * Otherwise a default radius is automatically computed given the area density.
         */
        aroundRadius: number,

        /**
         * Filters the results inside the area defined by the two extreme points of a rectangle.
         * See guide: https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filter-inside-rectanglepolygonal-area
         * or API reference: https://www.algolia.com/doc/api-reference/api-parameters/insideBoundingBox/
         * 
         * Format: topRightLat, topRightLng, bottomLeftLat, bottomLeftLng
         * 
         * Example: "60, 16, 40, -4"
         */
        insideBoundingBox: string,

        /**
         * Filters the results inside the area defined by a shape.
         * See guide: https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filter-inside-rectanglepolygonal-area
         * or API reference: https://www.algolia.com/doc/api-reference/api-parameters/insidePolygon/
         * 
         * Format: p1Lat, p1Lng, p2Lat, p2Lng, p3Lat, p3Lng...
         */
        insidePolygon: string,

        /**
         * Controls whether the _rankingInfo (https://www.algolia.com/doc/api-reference/api-methods/search/#method-response-_rankinginfo) object should be included in the hits. This defaults to false.
         * The _rankingInfo object for a Places query is slightly different from a regular Algolia query
         * and you can read up more about the difference and how to leverage them in our guide.
         * https://community.algolia.com/places/examples.html#using-_rankinginfo
         */
        getRankingInfo: boolean
    }

    export interface Result {
        degradedQuery: boolean;
        hits: Array<Hit>;
        nbHits: number;
        query: string;
        processingTimeMS: number;
    }

    export default class ReactNativeAlgoliaPlaces extends React.Component<PlacesProperties> {}
}