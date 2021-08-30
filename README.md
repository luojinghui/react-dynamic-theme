# React + Sass + Antd 动态主题配置

使用 CRA + Sass + Antd 搭建 React 项目，并基于动态 Sass 变量形式实现动态主题切换；

## 实现方式

创建 `src/var.scss` 文件，定义不同主题变量：

```scss
$themeList: (
  light: (
    bg: #fff,
    fontColor: #333,
    primaryColor: blue,
    inputSize: 32px,
    shadow: blue red 10px 10px,
  ),
  dark: (
    bg: #333,
    fontColor: #fff,
    primaryColor: rgb(224, 41, 41),
    inputSize: 46px,
    shadow: blue red 10px 10px,
  ),
);
```

通过 `themeify` mixin 函数，将所有变量抽离成 global 变量：

```scss
@mixin themei {
  @each $theme-name, $theme-map in $themeList {
    // 把局部变量强升为全局变量
    $theme-map: $theme-map !global;
    // #{}是sass的插值表达式
    [data-theme='theme-#{$theme-name}'] & {
      // @content是混合器插槽
      @content;
    }
  }
}
```

抽离公共 mixin 函数，使用主题变量：

```scss
// 定义参数默认值
$value: null !default;

/**
* $property { string } css属性值，类似：border、color、background-color
* $key { string } 在themeList中定义的变量key值
* $left { string } null css属性值，补充到变量前
* $right { string } null css属性值，补充到变量后
*/
@mixin s($property, $key, $left: $value, $right: $value) {
  @if $left && $right {
    @include themeify {
      #{$property}: $left map-get($theme-map, $key) $right;
    }
  } @else if $left && $left != null {
    @include themeify {
      #{$property}: $left map-get($theme-map, $key, $left);
    }
  } @else if $right && $right != null {
    @include themeify {
      #{$property}: map-get($theme-map, $key) $right;
    }
  } @else {
    @include themeify {
      #{$property}: $left map-get($theme-map, $key) $right;
    }
  }
}
```

如上所述，所有的动态 scss 变量和使用函数就定义完成了，接下来我们看看如何使用。

## 如何使用

在组件根目录使用：

```jsx
const THEME = {
  one: 'dark',
  two: 'light',
};

function App() {
  const [theme, setTheme] = React.useState(THEME.one);

  const themeStyle =
    theme === THEME.one ? `theme-${THEME.one}` : `theme-${THEME.two}`;

  <div className="App" data-theme="theme-light">
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
    </header>
  </div>;
}
```

通过在根节点定义 data-theme 自定义属性，动态设置 "theme-light" 或者 "theme-dark" 即可实现主体切换；

在样式中使用：

```scss
// 引入var变量函数
@import './var.scss';

.App-header {
  // 使用s mixin函数，定义color样式
  @include s('color', 'fontColor');
  background-size: 30px !important;
  // 使用s mixin函数，定义background样式
  @include s(
    'background',
    'bg',
    null,
    url('./flower.jpg') center center no-repeat
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}
```

详细动态设置 antd 组件样式参见：`scr/componetes/Button/index.scss` 或者 `scr/componetes/Input/index.scss`
