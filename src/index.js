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
        
    }

    searchResults(text) {
        var self = this;
        this.places
            .search({query: text, hitsPerPage: self.props.hitsPerPage, language: self.props.language},
                (err, res) => {
                    if (err) {
                        self.onSearchError(err);
                    } else {
                        self.setState({search: res, textSearch: text});
                    }
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
    language: "en",
    hitsPerPage: 5,
    itemList: (item, i, textSearch) => {
        return (
            <View
                key={i + "search_result"}
                style={styles.rowStyle}>
                    <Text style={styles.locationStyle}>{item.locale_names[0]}</Text>
                    <Text style={styles.cityStyle}>{ "  -  " + (item.city != undefined ? item.city[0] + ", " : "") + (item.administrative != undefined ? item.administrative[0] + ", " : "") + item.country}</Text>
            </View>
        );
    }
}

ReactNativeAlgoliaPlaces.propTypes = {
    appId: PropTypes.string,
    appKey: PropTypes.string,
    language: PropTypes.string,
    hitsPerPage: PropTypes.number,

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
    highlightStyle: {
      backgroundColor: "yellow"
    },
    locationStyle: {
        fontSize: 20
    },
    cityStyle: {
        fontSize: 16
    }
};