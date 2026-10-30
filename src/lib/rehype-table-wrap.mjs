// Wraps Markdown tables in a scrollable region that keyboard users can
// focus and scroll, named after the heading that precedes the table.
const text = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(text).join('');

export function rehypeTableWrap() {
  return (tree) => {
    const walk = (parent) => {
      let heading = '';
      parent.children?.forEach((node, i) => {
        if (node.type !== 'element') return;
        if (/^h[1-6]$/.test(node.tagName)) heading = text(node).trim();
        if (node.tagName === 'table') {
          parent.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrap'], tabIndex: 0, role: 'region', ariaLabel: heading || 'Table' },
            children: [node],
          };
          return;
        }
        walk(node);
      });
    };
    walk(tree);
  };
}
