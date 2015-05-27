( function () {
	'use strict';

	/* @ngInject */
	function DashboardController( $q, logger, FlickrService, $window ) {
		var self = this;

		var store = $window.localStorage;
		var storedSearch = store.getItem( 'search' );
		var searchTags = [];

		self.searchText;
		self.photos = [];
	    self.pageNav = [];
	    self.text = '';
		self.title = 'Dashboard';
		self.searchFlickr = searchFlickr;
		self.getMore = getMore;
		self.loading = true;
		self.seeResults = false; // hide results count if no data

		if ( storedSearch !== "undefined" && storedSearch ) {
			self.searchText = storedSearch;
		}

		searchFlickr( self.searchText );

		function searchFlickr( searchText ) {
			self.searchText = searchText || 'coffee';
			// store to localstorage all the searches
			store.setItem( 'search', searchText );
			self.searchTextResult = self.searchText;

			FlickrService.searchFlickr( searchText )
				.then( function ( data ) {
					self.loading = false;
					self.seeResults = true;
					self.photos = data.photos.photo;
		            self.pages  = data.photos.pages;
		            self.total  = data.photos.total;
		            getMore();
				})
				.catch( errorHandler );
		}
		 function updateSearchText( searchText ) {
		 	self.searchText = FlickrService.setSearchText( searchText );
		 }
		 function getMore() {
		 	console.log( 'test' );
		 }
		
		function errorHandler( error ) {
			var msg = 'Error in fetching data';
			logger.error( msg) ;
			return $q.reject(msg);
		}

	}


	angular
		.module( 'app.dashboard' )
		.controller( 'DashboardController', DashboardController );

} ) ();
