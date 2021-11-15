type Props = {
    [key: string] : any
}

type VNode = {
    tag: keyof HTMLElementTagNameMap,
    props: Props | null,
    children: unknown[]
}

function h(
  tag: keyof HTMLElementTagNameMap,
  props: Props | null,
  children: unknown[]
): VNode {
  return {
    tag,
    props,
    children,
  }
}

const vdom = h('div', {class: 'red'}, [h('span', null, ['hello'])])

function mount(vnode: VNode, container){
    const el = document.createElement(vnode.tag)
}