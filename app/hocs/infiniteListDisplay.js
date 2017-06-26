import React, { cloneElement } from 'react';
import { range } from 'ramda';
import { getDisplayName, isClass, getBaseClass } from './helpers';
import infiniteScroller from './infiniteScroller';


const infiniteListDisplay = (mapLoaderCallback, mapListToState) => (BaseComponent) => {
  class InfiniteList extends getBaseClass(BaseComponent) {
    constructor(props) {
      super(props);

      this.handleScroll = this.handleScroll.bind(this);
      this.superRender = this.superRender.bind(this);
      this.firstVisibleEntry = this.firstVisibleEntry.bind(this);

      this.state = {
        firstVisibleEntry: 0,
        Wrapper: 'ul',
        ...mapListToState(props),
      };
    }

    componentWillReceiveProps(nextProps) {
      if (BaseComponent.prototype.shouldComponentUpdate && !super.shouldComponentUpdate(nextProps)) {
        return;
      }

      this.setState({
        ...mapListToState(nextProps),
      });

      if (BaseComponent.prototype.componentWillReceiveProps) {
        super.componentWillReceiveProps(nextProps);
      }
    }

    firstVisibleEntry(scrollTop) {
      return Math.max(Math.floor(scrollTop / this.state.entryHeight) - 1, 0);
    }

    handleScroll({ scrollTop, clientHeight }) {
      const { firstVisibleEntry, entryHeight } = this.state;

      if (this.firstVisibleEntry(scrollTop) !== firstVisibleEntry) {
        this.setState({
          entriesToRender: Math.ceil(clientHeight / entryHeight) + 1,
          firstVisibleEntry: this.firstVisibleEntry(scrollTop),
        });
      }
    }

    render() {
      const {
        firstVisibleEntry,
        entriesToRender,
        totalEntries,
        renderEntry,
        entryHeight,
        Wrapper,
      } = this.state;

      const lastEntryVisible = entriesToRender + firstVisibleEntry > totalEntries
        ? totalEntries
        : (entriesToRender || totalEntries) + firstVisibleEntry;

      const topSpacerHeight = firstVisibleEntry * entryHeight;
      const bottomSpacerHeight = lastEntryVisible
        ? (totalEntries - lastEntryVisible) * entryHeight
        : 0;

      const parent = isClass(BaseComponent)
        ? super.render()
        : BaseComponent(this.props);

      return cloneElement(parent, {}, (
        <Wrapper>
          <div style={{ height: `${topSpacerHeight}px` }} />
          {range(firstVisibleEntry, lastEntryVisible)
            .map((key) => renderEntry({ key, index: key }))}
          <div style={{ height: `${bottomSpacerHeight}px` }} />
        </Wrapper>
      ));
    }
  }

  InfiniteList.displayName = getDisplayName(BaseComponent);

  return infiniteScroller(mapLoaderCallback)(InfiniteList);
};

export default infiniteListDisplay;
