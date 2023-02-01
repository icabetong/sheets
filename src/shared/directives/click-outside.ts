/** Dispatch event on click outside of node */
export function clickOutside(node: HTMLElement) {
	const handleClick = (event: Event) => {
		if (node && !node.contains(event.target as Node | null) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent<HTMLElement>('clickOutside', { detail: node }))
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}
