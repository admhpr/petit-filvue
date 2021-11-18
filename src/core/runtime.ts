type Props = {
  [key: string]: any;
};

type VNode = {
  tag: keyof HTMLElementTagNameMap;
  el?: HTMLElement;
  props: Props | null;
  children: VNode[] | string;
};

function h(
  tag: keyof HTMLElementTagNameMap,
  props: Props | null,
  children: VNode[] | string
): VNode {
  return {
    tag,
    props,
    children,
  };
}

function mount(vnode: VNode, container: HTMLElement) {
  const el = (vnode.el = document.createElement(vnode.tag));
  // has props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      el.setAttribute(key, value);
    }
  }
  // has children
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((child) => {
        mount(child, el);
      });
    }
  }
  container.appendChild(el);
}

function patch(node1: VNode, node2: VNode) {
  if (node1.tag === node2.tag) {
    const el = (node2.el = node1.el);
    // props
    const oldProps = node1.props || {};
    const newProps = node2.props || {};
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (newValue !== oldValue) {
        el!.setAttribute(key, newValue);
      }
    }
    for (const key in oldProps) {
      if (!(key in newProps)) {
        el!.removeAttribute(key);
      }
    }
    // children
    const oldChildren = node1.children;
    const newChildren = node2.children;
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el!.textContent = newChildren;
        }
      } else {
        el!.textContent = newChildren;
      }
    } else {
      if (typeof oldChildren === "string") {
        el!.innerHTML = "";
        newChildren.forEach((child) => {
          mount(child, el!);
        });
      } else {
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach((child) => {
            mount(child, el!);
          });
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((child) => {
            el!.removeChild(child.el!);
          });
        }
      }
    }
  } else {
  }
}
