declare module 'react-native-algolia-places' {
    import * as React from 'react';

    type PlacesProperties = {
        appId: string,
        appKey: string
    } & Partial<DefaultProperties>

    type DefaultProperties = {
        language: string,
        hitsPerPage: number,
        itemList: (item: Hit, i: number, text: string) => React.ReactNode

        onSearchError: (err: any) => void;
    }

    interface HighlightResult {
        administrative: Array<Highlight>;
        country: Array<Highlight>;
        county: Array<Highlight>;
        locale_names: Array<Highlight>;
        postcode: Array<Highlight>;
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

    interface Hit {
        locale_names: Array<string>;
        city: Array<string>;
        county: Array<string>;
        administrative: Array<string>;
        country: string;
        country_code: string;
        postcode: Array<string>;
        population: number;
        _geoloc: GeoLoc;
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

    export interface Result {
        hits: Array<Hit>;
        nbHits: number;
        query: string;
    }

    export default class ReactNativeAlgoliaPlaces extends React.Component<PlacesProperties> {
    }
}