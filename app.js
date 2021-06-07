(function(){
	console.log('Hello World');

	let tabs = document.querySelectorAll('[role="tab"]');
	let tcontent = document.querySelectorAll('[role="tabpanel"]');
	let color1 = document.querySelectorAll('[name="tc1"]');
	let filters = document.querySelectorAll('.filters');
	let hideAllTabs = function() {
		
		document.querySelector('[role="tab"][aria-selected="true"]').setAttribute('aria-selected', 'false');

		tcontent.forEach(function(tc){
			tc.setAttribute('hidden', true);
			tc.setAttribute('aria-hidden', 'true');
		});
	};
	let showClicked = function(tab) {
		let currTabContent = document.getElementById( tab.getAttribute('aria-controls') );
		
		tab.setAttribute('aria-selected', 'true');
		currTabContent.removeAttribute('hidden');
		currTabContent.setAttribute('aria-hidden', 'false');
		currTabContent.focus();
	};
	let setFiltersValue = function(name, value) {
		filters.forEach(function(filter){
			filter.style.setProperty('--' + name, value);
		});
	};
	let setAppBottomPadding = function() {
		let toolbarH = document.querySelector('.toolbar').offsetHeight;
		console.log(toolbarH);
		document.querySelector('body').style.setProperty('--toolbard-height', toolbarH + 'px');
	};

	/**
	 * Get toolbar height
	 */
	setAppBottomPadding();
	window.addEventListener('resize', setAppBottomPadding);

	/**
	 * Makes the type of product change.
	 */
	tabs.forEach(function(tab){
		tab.addEventListener('click', function(e){
			hideAllTabs();
			showClicked(this);
		});
	});

	/**
	 * Makes the color of product change.
	 */
	color1.forEach(function(c1) {
		c1.addEventListener('change', function(e){
			setFiltersValue('color', 'var(--' + this.value + ')');
			setFiltersValue('filter', 'var(--' + this.value + '-filter)');
			setFiltersValue('brightness-opacity', 'var(--' + this.value + '-brightness-opacity)');
			setFiltersValue('brightness-filter', 'var(--' + this.value + '-brightness-filter)');
		});
	});
})();