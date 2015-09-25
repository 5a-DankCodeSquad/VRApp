'use strict';

(function() {
	// Cores Controller Spec
	describe('Cores Controller Tests', function() {
		// Initialize global variables
		var CoresController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Cores controller.
			CoresController = $controller('CoresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Core object fetched from XHR', inject(function(Cores) {
			// Create sample Core using the Cores service
			var sampleCore = new Cores({
				name: 'New Core'
			});

			// Create a sample Cores array that includes the new Core
			var sampleCores = [sampleCore];

			// Set GET response
			$httpBackend.expectGET('api/cores').respond(sampleCores);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cores).toEqualData(sampleCores);
		}));

		it('$scope.findOne() should create an array with one Core object fetched from XHR using a coreId URL parameter', inject(function(Cores) {
			// Define a sample Core object
			var sampleCore = new Cores({
				name: 'New Core'
			});

			// Set the URL parameter
			$stateParams.coreId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/cores\/([0-9a-fA-F]{24})$/).respond(sampleCore);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.core).toEqualData(sampleCore);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Cores) {
			// Create a sample Core object
			var sampleCorePostData = new Cores({
				name: 'New Core'
			});

			// Create a sample Core response
			var sampleCoreResponse = new Cores({
				_id: '525cf20451979dea2c000001',
				name: 'New Core'
			});

			// Fixture mock form input values
			scope.name = 'New Core';

			// Set POST response
			$httpBackend.expectPOST('api/cores', sampleCorePostData).respond(sampleCoreResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Core was created
			expect($location.path()).toBe('/cores/' + sampleCoreResponse._id);
		}));

		it('$scope.update() should update a valid Core', inject(function(Cores) {
			// Define a sample Core put data
			var sampleCorePutData = new Cores({
				_id: '525cf20451979dea2c000001',
				name: 'New Core'
			});

			// Mock Core in scope
			scope.core = sampleCorePutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/cores\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/cores/' + sampleCorePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid coreId and remove the Core from the scope', inject(function(Cores) {
			// Create new Core object
			var sampleCore = new Cores({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Cores array and include the Core
			scope.cores = [sampleCore];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/cores\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCore);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.cores.length).toBe(0);
		}));
	});
}());