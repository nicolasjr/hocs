import { PureComponent } from 'react';

export function getDisplayName(BaseComponent) {
  return BaseComponent.displayName || BaseComponent.name || 'Component';
}

export function isClass(BaseComponent) {
  return !!BaseComponent.prototype.render;
}

export function getBaseClass(BaseComponent) {
  return isClass(BaseComponent)
    ? BaseComponent
    : PureComponent;
}
