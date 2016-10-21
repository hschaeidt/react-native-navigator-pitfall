/**
 * @flow
 */

'use strict'

import React, {Component, Element} from 'react'
import {
  AppRegistry,
  Navigator,
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

class ContentView extends Component {
  render(): Element<View> {
    return (
      <View>
        <Text>Hello World!</Text>
      </View>
    )
  }
}

type Route = {
  title: string,
  component: Object,
}

const initialRoute = {
  title: 'Hello World!',
  component: ContentView,
}

export default class NavigatorSampleNavigation extends Component {
  render(): Element<Navigator> {
    return (
      <Navigator
        ref='navigation'
        debugOverlay={true}
        initialRoute={initialRoute}
        configureScene={(route: Route, routeStack: Array<Route>) => {
          return Navigator.SceneConfigs.FloatFromRight
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: this.navigationLeftButton,
              Title: this.sceneTitle,
              RightButton: () => {},
            }}
            style={styles.navigationBar}
          />
        }
        style={styles.appContainer}
        renderScene={this.renderScene}
        sceneStyle={styles.scene}
      />
    )
  }

  renderScene = (route: Route, navigator: Navigator): Element<any> => {
    return <route.component navigation={navigator} />
  }

  sceneTitle = (route: Route,
                navigator: Navigator,
                index: number,
                navState: Object,): Element<Text> => {
    return <Text>{route.title}</Text>
  }

  navigationLeftButton = (route: Route,
                          navigator: Navigator,
                          index: number,
                          navState: Object): ?Element<TouchableHighlight> => {
    if (index === 0) {
      return null
    }

    return (
      <TouchableHighlight onPress={() => navigator.pop()}>
        <Text>Back</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  navigationBar: {
    backgroundColor: 'silver',
  },
  scene: {
    marginTop: 64,
    backgroundColor: 'red',
  },
})
