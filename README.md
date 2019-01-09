# ReactNativeAlgoliaPlaces
ReactNativeAlgoliaPlaces is a module for React Native that helps you to create an address autocompletion based on Algolia Places

## Demo
![](https://media.giphy.com/media/7T8SM6PL89ZUZgMteX/giphy.gif)

## Installation
```
npm i react-native-algolia-places --save
```

## Usage
### Basic
```js
import ReactNativeAlgoliaPlaces from 'react-native-algolia-places'

render() {
    <ReactNativeAlgoliaPlaces appId={"appId"} appKey={"appKey"} />
}
```
### Render Object
```js
import ReactNativeAlgoliaPlaces from 'react-native-algolia-places'

render() {
    <ReactNativeAlgoliaPlaces appId={"appId"} appKey={"appKey"} 
      itemList={(item, i, textSearch) => 
           <Text key={i + "item"}>item.locale_names[0]</Text>
      }/>
}
```

## Properties
- **appId** The Places application ID to use
- **appKey** The Places search API key to use
- **hitsPerPage** Set the number of hits per page
- **language** Language of the results
- **onSearchError** When api request return an error
- **itemList(item, i, textSearch)** Custom render object for items in list (recommended)
  - **item** = Item retrieved based on text searched
  - **i** = Counter of items
  - **textSearch** = Text searched


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)