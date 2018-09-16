import React, {Component} from 'react';
import { 
  Animated
} from 'react-native';

export default class SlideAnimation extends Component {
  constructor(props) {
    super(props)
    let startValue = this.props.direction ? 500 : -500
    this.state = {
      fadeAnim: new Animated.Value(startValue),  // 组件初始化在最右端，不可见
    }
  }

  componentDidMount() {
    Animated.timing(                  // 随时间变化而执行动画
      this.state.fadeAnim,            // 动画中的变量值
      {
        toValue: 0,                   // 平移距离最后变为0
        duration: 400,              // 让动画持续一段时间
      }
    ).start();                        // 开始执行动画
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View      // 使用专门的可动画化的View组件
        style = {[this.props.style, {translateX: fadeAnim}]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
