import React, { Component } from 'react';
import PolygonGraph from '../../containers/PolygonGraph/PolygonGraph';

class App extends Component {
  render() {
    return (
      <PolygonGraph
        radius='200'
        percentages={[1, 0.7, 0.89, 0.65, 0.91, 0.95]}
        borderColor='#f00'
        fillColor="#fcc" />
    );
  }
}

export default App;