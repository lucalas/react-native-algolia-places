import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import algoliasearch from 'algoliasearch/reactnative';
import Search from 'react-native-search-box';

export default class ReactNativeAlgoliaPlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {textSearch: "", search: null};

        this.searchResults = this.searchResults.bind(this);

        this.places = algoliasearch.initPlaces(this.props.appId, this.props.appKey);

        this.searchResults(this.state.textSearch);
        
    }

    searchResults(text) {
          // Create an empty options object to fill
        var finalOptions = {};

        // If user set options we use them
        if (this.props.options) {
            finalOptions = this.props.options;
        }

        // Add query item to options
        finalOptions.query = text

        this.places
            .search(finalOptions).then(res => {
                this.setState({search: res, textSearch: text});
            }).catch(err => {
                this.onSearchError(err);
            });
    }

    async onSearchError (err) {
        if (this.props.onSearchError) {
            await this.props.onSearchError(err);
        }
    }

    render() {
        return(
            <View style={styles.containerStyle}>
            <Search
            defaultValue={this.state.textSearch}
            onChangeText={this.searchResults}
            />
            {
                this.state.search && this.state.search.hits.map((item, i) =>
                    this.props.itemList(item, i, this.state.textSearch)
                )
            }
            </View>
        );
    }
}

ReactNativeAlgoliaPlaces.defaultProps = {
    itemList: (item, i, textSearch) => {
        return (
            <View
                key={i + "search_result"}
                style={styles.rowStyle}>
                    <Text style={styles.locationStyle}>{(item.locale_names instanceof Array) ? item.locale_names[0] : item.locale_names.default[0]}</Text>
                    <Text style={styles.cityStyle}>{ "  -  " + (item.city != undefined ? item.city[0] + ", " : "") + (item.administrative != undefined ? item.administrative[0] + ", " : "") + (typeof item.country === "string" ? item.country : item.country.default) }</Text>
            </View>
        );
    }
}

ReactNativeAlgoliaPlaces.propTypes = {
    appId: PropTypes.string,
    appKey: PropTypes.string,
    options: PropTypes.object,


    onSearchError: PropTypes.func,
    itemList: PropTypes.func
}

const styles = {
    containerStyle: {
        padding: 2
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: 'azure',
        borderBottomWidth: 2
    },
    locationStyle: {
        fontSize: 20
    },
    cityStyle: {
        fontSize: 16
    }
};