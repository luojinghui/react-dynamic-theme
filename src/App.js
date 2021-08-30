import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { DatePicker, Input, Select } from 'antd';
import { XYButton } from './componentes/Button';
import { XYInput } from './componentes/Input';

const { Option } = Select;

function App() {
  const [theme, setTheme] = React.useState('pc');

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const themeStyle = theme === 'pc' ? 'theme-pc' : 'theme-buffet';

  return (
    <div className="App" data-theme={themeStyle}>
      <header className="App-header">
        <div className="box">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className="box">
          <XYButton
            type="primary"
            onClick={() => {
              setTheme(theme === 'pc' ? 'buffet' : 'pc');
            }}
          >
            切换主题
          </XYButton>
        </div>

        <div className="box">
          <DatePicker />
        </div>

        {/* <div className="box"><XYInput placeholder="Basic usage" /></div> */}

        <div className="box">
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
