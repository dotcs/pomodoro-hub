import * as React from "react";

type HOC<T> = (hoc: React.ComponentType<T>) => React.ComponentType<T>;

/** Composes multiple higher order components into a new one. */
function compose<T>(...hocs: HOC<any>[]): HOC<T> {
  return function<U>(
    classToWrap: React.ComponentType<U>
  ): React.ComponentType<T> {
    let composed: React.ComponentType<T> = classToWrap as any;
    const reversedHoc = hocs.reverse();
    for (const hoc of reversedHoc) {
      composed = hoc(composed);
    }
    return composed;
  };
}

export default compose;
