import * as React from 'react';

export  default class ReactNativeAlgoliaPlaces extends React.Component<PlacesProperties, any> {
}

interface PlacesProperties {
    appId: string,
    appKey: string,
    language?: string,
    hitsPerPage?: number,

    onItemClick?: (item: any) => any;
    onSearchError?: (err: any) => any;
}