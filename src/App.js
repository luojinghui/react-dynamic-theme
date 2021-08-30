import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { DatePicker, Input, Select } from 'antd';
import { XYButton } from './componentes/Button';
import { XYInput } from './componentes/Input';

const { Option } = Select;

const THEME = {
  one: 'dark',
  two: 'light',
};

function App() {
  const [theme, setTheme] = React.useState(THEME.one);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const themeStyle =
    theme === THEME.one ? `theme-${THEME.one}` : `theme-${THEME.two}`;

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
              setTheme(theme === THEME.one ? THEME.two : THEME.one);
            }}
          >
            切换主题
          </XYButton>
        </div>

        <div className="box">
          <XYInput placeholder="Basic usage" />
        </div>

        <div className="box">
          <p>如果你在七夕（没错就是2021年8月14日）的这一天刚好加班</p>
        </div>
      </header>
    </div>
  );
}

export default App;
