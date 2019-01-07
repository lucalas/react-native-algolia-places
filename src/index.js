import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import algoliasearch from 'algoliasearch';
import Highlighter from 'react-native-highlight-words';
import Search from 'react-native-search-box';

export default class ReactNativeAlgoliaPlaces extends Component {

    constructor(props) {
        super(props);
        this.state = {textSearch: "", search: []};
        this.onItemClick = this.onItemClick.bind(this);

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
                        self.setState({search: res.hits, textSearch: text});
                    }
            });
    }

    async onSearchError (err) {
        if (this.props.onSearchError) {
            await this.props.onSearchError(err);
        }
    }

    async onItemClick (item) {
        if (this.props.onItemClick) {
            await this.props.onItemClick(item);
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
                this.state.search.map((item, i) =>
                    <TouchableHighlight
                    key={i + "search_result"}
                    onPress={() => this.onItemClick(item)}>
                        <View
                        style={styles.rowStyle}>
                            <Highlighter
                            highlightStyle={styles.highlightStyle}
                            searchWords={this.state.textSearch.split(" ")}
                            textToHighlight={item.locale_names[0]}
                            style={styles.locationStyle}
                            />
                            <Highlighter
                            highlightStyle={styles.highlightStyle}
                            searchWords={this.state.textSearch.split(" ")}
                            textToHighlight={ "  -  " + (item.city != undefined ? item.city[0] + ", " : "") + (item.administrative != undefined ? item.administrative[0] + ", " : "") + item.country}
                            style={styles.cityStyle}
                            />
                        </View>
                    </TouchableHighlight>
                )
            }
            </View>
        );
    }
}

ReactNativeAlgoliaPlaces.defaultProps = {
    language: "en",
    hitsPerPage: 5
}

ReactNativeAlgoliaPlaces.propTypes = {
    appId: PropTypes.string,
    appKey: PropTypes.string,
    language: PropTypes.string,
    hitsPerPage: PropTypes.number,

    onItemClick: PropTypes.func,
    onSearchError: PropTypes.func
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