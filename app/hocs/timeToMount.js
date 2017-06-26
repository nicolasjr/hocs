import { getDisplayName, isClass, getBaseClass } from './helpers';


const timeToMount = (BaseComponent) => {
  const BaseClass = getBaseClass(BaseComponent);

  class TimeToMount extends BaseClass {
    componentWillMount() {
      if (BaseClass.prototype.componentWillMount) {
        super.componentWillMount();
      }
      this.time = new Date();
    }

    componentDidMount() {
      console.log(`It took ${new Date() - this.time}ms to render ${this.constructor.displayName}`); // eslint-disable-line
      if (BaseClass.prototype.componentDidMount) {
        super.componentDidMount();
      }
    }

    render() {
      return isClass(BaseComponent)
        ? super.render()
        : BaseComponent(this.props);
    }
  }

  TimeToMount.displayName = getDisplayName(BaseComponent);

  return TimeToMount;
};

export default timeToMount;
