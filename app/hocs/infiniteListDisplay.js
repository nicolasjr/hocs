import { getDisplayName, isClass, getBaseClass } from './helpers';
import infiniteScroller from './infiniteScroller';


const infiniteListDisplay = (mapLoaderCallback, mapListToState) => (BaseComponent) => {
  class InfiniteList extends getBaseClass(BaseComponent) {
    constructor(props) {
      super(props);

      this.handleScroll = this.handleScroll.bind(this);
      this.superRender = this.superRender.bind(this);

      this.state = { ...mapListToState(this.props) };
    }

    handleScroll({ scrollTop }) {
      console.log('scroll', scrollTop);
      console.log(this.state);
    }

    render() {
      return isClass(BaseComponent)
        ? super.render()
        : BaseComponent(this.props);
    }
  }

  InfiniteList.displayName = getDisplayName(BaseComponent);

  return infiniteScroller(mapLoaderCallback)(InfiniteList);
};

export default infiniteListDisplay;
