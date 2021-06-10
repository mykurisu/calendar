import React from 'react';
import { render } from 'react-dom';
import Calendar from '../lib';
const App = () => (
    <div style={{width: '375px'}}>
        <Calendar />
    </div>
);
render(<App />, document.getElementById("root"));