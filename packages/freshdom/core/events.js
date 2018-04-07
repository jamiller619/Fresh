export const eventTypes = {
  constructor: 'constructor',
  render: 'render',
  onBeforeAttach: 'onBeforeAttach',
  onAttach: 'onAttach',
  onDetach: 'onDetach',
  onUpdate: 'onUpdate'
}

export const trigger = async (context, type, props, ...args) => {
  const method = props && props[type] || context[type] || (context.prototype && context.prototype[type]) || undefined
  const customEvent = new CustomEvent(type)
  
  context.dispatchEvent(customEvent)

  if (typeof method === 'function') {
    await method.call(context, ...args)
  }
}