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

      this.callback = mapCallback(props);
    }

    componentDidUpdate() {
      this.callback = mapCallback(this.props);

      if (BaseComponent.prototype.componentDidUpdate) {
        super.componentDidUpdate(this.props);
      }
    }

    didReachScrollBottom = ({ scrollHeight, scrollTop, clientHeight }) => scrollTop + clientHeight >= scrollHeight

    handleScroll({ target }) {
      if (this.didReachScrollBottom(target)) {
        this.callback();
      }
      if (BaseComponent.prototype.handleScroll) {
        super.handleScroll(target);
      }
    }

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
