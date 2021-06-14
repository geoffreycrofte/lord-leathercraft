(function(){
	console.log('Hello World');
	const url = new URL(window.location);
	let tabs = document.querySelectorAll('[role="tab"]');
	let tcontent = document.querySelectorAll('[role="tabpanel"]');
	let color1 = document.querySelectorAll('[name="tc1"]');
	let color2 = document.querySelectorAll('[name="tc2"]');
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
	let updateURL = function(param, value) {
		url.searchParams.set(param, value);
		window.history.pushState({}, '', url);
	};

	/**
	 * Makes the type of product change.
	 */
	tabs.forEach(function(tab){
		tab.addEventListener('click', function(e){
			hideAllTabs();
			showClicked(this);
			updateURL('p', this.id.split('-')[2]);
		});
	});

	/**
	 * Makes the color of product change.
	 */
	color1.forEach(function(c1) {
		c1.addEventListener('change', function(e, i){
			setFiltersValue('color', 'var(--' + this.value + ')');
			setFiltersValue('filter', 'var(--' + this.value + '-filter)');
			setFiltersValue('brightness-opacity', 'var(--' + this.value + '-brightness-opacity)');
			setFiltersValue('brightness-filter', 'var(--' + this.value + '-brightness-filter)');

			
			updateURL('c1', this.value );
		});
	});

	color2.forEach(function(c2) {
		c2.addEventListener('change', function(e){
			setFiltersValue('color-2', 'var(--' + this.value + ')');
			setFiltersValue('filter-2', 'var(--' + this.value + '-filter)');
			setFiltersValue('brightness-opacity-2', 'var(--' + this.value + '-brightness-opacity)');
			setFiltersValue('brightness-filter-2', 'var(--' + this.value + '-brightness-filter)');

			updateURL('c2', this.value );
		});
	});

	/**
	 * Read URL Parameters
	 */
	const queryString = url.search;
	const urlParams = new URLSearchParams(queryString);

	if ( urlParams.has('p') ) {
		document.getElementById('tab-p-' + urlParams.get('p') ).click();
	}

	if ( urlParams.has('c1') ) {
		document.querySelector('[name="tc1"][value="' + urlParams.get('c1') + '"]').click();
	}

	if ( urlParams.has('c2') ) {
		document.querySelector('[name="tc2"][value="' + urlParams.get('c2') + '"]').click();	
	}

})();