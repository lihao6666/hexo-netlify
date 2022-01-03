---
title: React学习笔记1之组件和生命周期
date: 2021-10-18 10:11:17
tags: React
categories:
- 前端
- React
---

## React组件

**定义组件**

```js

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

**渲染组件**

```js
const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 生命周期

### 生命周期函数

`state`可以定义属性只能组件内访问，使用类定义组件可以使用生命周期方法

```js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

```

### State 技巧

* 不要直接修改state，使用`this.setState({comment: 'Hello'})`
  
* State 的更新可能是异步的

    出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
    因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态，可以传函数来实现更新:
    ```js
        this.setState(function(state, props) {
    return {
        counter: state.counter + props.increment
    };});
    ```

* State 的更新会被合并

    当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。

* State 是自上而下的单向数据流