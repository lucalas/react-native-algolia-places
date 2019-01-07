# ReactNativeAlgoliaPlaces
ReactNativeAlgoliaPlaces is a module for React Native that helps you to create an address autocompletion based on Algolia Places

## Demo
(https://media.giphy.com/media/7T8SM6PL89ZUZgMteX/giphy.gif)

## Installation
```
npm i react-native-algolia-places --save
```

## Usage
```js
import ReactNativeAlgoliaPlaces from 'react-native-algolia-places'

render() {
    <ReactNativeAlgoliaPlaces appId={"appId"} appKey={"appKey"} />
}
```

## Properties
- **appId** The Places application ID to use
- **appKey** The Places search API key to use
- **hitsPerPage** Set the number of hits per page
- **language** Language of the results
- **onItemClick** When an user click an address
- **onSearchError** When api request return an error


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)