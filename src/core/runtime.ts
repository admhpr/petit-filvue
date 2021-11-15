type Props = {
    [key: string] : any
}

function h(
  tag: keyof HTMLElementTagNameMap,
  props: Props | null,
  children: unknown[]
) {
  return {
    tag,
    props,
    children,
  }
}

const vdom = h('div', {class: 'red'}, [h('span', null, ['hello'])])

function mount(vnode, container){}