import React from 'react';
import { getDisplayName, isClass, getBaseClass } from './helpers';


const infiniteScroller = (mapCallback) => (BaseComponent) => {
  const style = {
    overflowY: 'auto',
    height: '100%',
    width: '100%',
  };

  class InfiniteScroller extends getBaseClass(BaseComponent) {
    constructor(props) {
      super(props);

      this.handleScroll = this.handleScroll.bind(this);
      this.superRender = this.superRender.bind(this);

      this.callback = mapCallback(props);
    }

    didReachScrollBottom = ({ scrollHeight, scrollTop, clientHeight }) => scrollTop + clientHeight >= scrollHeight

    handleScroll = ({ target }) => this.didReachScrollBottom(target) && this.callback()

    superRender(props) {
      return isClass(BaseComponent)
        ? super.render()
        : BaseComponent(props);
    }

    render() {
      const content = this.superRender(this.props);
      const { children } = content.props;

      return React.cloneElement(content, {}, (
        <div style={style} onScroll={this.handleScroll}>
          {children}
        </div>
      ));
    }
  }

  InfiniteScroller.displayName = getDisplayName(BaseComponent);

  return InfiniteScroller;
};

export default infiniteScroller;
