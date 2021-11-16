type Props = {
  [key: string]: any;
};

type VNode = {
  tag: keyof HTMLElementTagNameMap;
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
  const el = document.createElement(vnode.tag);
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
