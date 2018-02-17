'use strict';

appControllers.controller('MainController', ['$rootScope', '$scope', '$http', 'authorization',
    function($rootScope, $scope, $http, authorization) {

	    $scope.status = 'running...';
        $scope.profile = authorization.profile;
        $scope.isUser = authorization.hasRealmRole('user');

        $scope.gatewayUrl = "http://localhost:8080"; //will be port 30080 for minikube on a minikube IP

        $scope.routesUrl = $scope.gatewayUrl + "/application/routes";
        $scope.auditUrl = $scope.gatewayUrl + "/audit/v1/events";
        $scope.tasksUrl = $scope.gatewayUrl + "/query/v1/tasks";
        $scope.processInstancesUrl = $scope.gatewayUrl + "/query/v1/process-instances";
        $scope.processDefinitionsUrl = $scope.gatewayUrl + "/rb-my-app/v1/process-definitions";
        $scope.startProcessUrl = $scope.gatewayUrl + "/rb-my-app/v1/process-instances";
        $scope.startProcessPostBody = "{\n\"processDefinitionId\": \"SimpleProcess:1:4\",         \n\"variables\": {         \n\"firstName\": \"Paulo\",         \n\"lastName\": \"Silva\",         \n\"aget\": 25     \n},\n\"commandType\":\"StartProcessInstanceCmd\"\n}";
        $scope.claimTaskUrl = $scope.gatewayUrl + "/rb-my-app/v1/tasks/{taskId}/claim?assignee=testuser";
        $scope.completeTaskUrl = $scope.gatewayUrl + "/rb-my-app/v1/tasks/{taskId}/complete";

        // Configure graphql scope attributes
        $scope.graphQLUrl = $scope.gatewayUrl + "/query/graphql";
        $scope.graphQLPostBody = [
        	"{",
    		"  ProcessInstances {",
    		"    select {",
    		"      processInstanceId",
    		"      tasks {",
    		"        id",
    		"        status",
    		"        name",
    		"        assignee",
    		"        variables {",
    		"          id",
    		"          name",
    		"          type",
    		"          value",
    		"        }",
    		"      }",
    		"      variables {",
    		"        id",
    		"        name",
    		"        type",
    		"        value",
    		"      }",
    		"    }",
    		"  }",
    		"}"
        ].join("\n");
        
        // Based on minimal NPM graphql example: https://github.com/farskipper/vanilla-js-apollo-graphql-full-stack-playground
        // TODO Use Apollo Angular client for NPM application: https://www.apollographql.com/docs/angular/recipes/simple-example.html
        // Temporary hack loading latest Apollo NPM dependencies into browser in non-NPM Angular application
        Promise.all([
            require("apollo-link-http"),
            require("apollo-client"),
            require("apollo-cache-inmemory"),
            require("gql","graphql-tag"),
        ])
        .then(resolved => {
        	var HttpLink = resolved[0].HttpLink;
        	var ApolloClient = resolved[1].ApolloClient;
        	var InMemoryCache = resolved[2].InMemoryCache;
        	$scope.gql = resolved[3];

    		// TODO use link chain for injecting token into headers 
    		// TODO Implement custom client fetcher with graphql endpoint url and authentication token refresh 
        	// https://blog.beeaweso.me/refreshing-token-based-authentication-with-apollo-client-2-0-7d45c20dc703
    		$scope.apolloClient = new ApolloClient({
        	    link: new HttpLink({
        	    	uri: $scope.graphQLUrl,
        	    	headers: {
        	    	      Authorization: "Bearer " + localStorage.token
       	    	    }        	    	
        	    }),
        	    cache: new InMemoryCache(),
        	});

    	})
        

        $scope.getRoutes = function() {
            $http.get($scope.routesUrl).success(function(data) {
            	$scope.gwroutes = data;
            });
        }

        $scope.getAuditEvents = function() {
            $http.get($scope.auditUrl).success(function(data) {
                $scope.auditEvents = data;
            });
        }

        $scope.getTasks = function() {
            $http.get($scope.tasksUrl).success(function(data) {
                $scope.tasks = data;
            });
        }

        $scope.getProcessInstances = function() {
            $http.get($scope.processInstancesUrl).success(function(data) {
                $scope.processInstances = data;
            });
        }

        $scope.getProcessDefinitions = function() {
            $http.get($scope.processDefinitionsUrl).success(function(data) {
                $scope.processDefinitions = data;
            });
        }

        $scope.startProcess = function() {
            $http.post($scope.startProcessUrl, $scope.startProcessPostBody).then(function(data) {
                $scope.startProcessResponse = data.data;
            });
        }

        $scope.claimTask = function() {
            $http.post($scope.claimTaskUrl).then(function(data) {
                $scope.claimTaskResponse = data.data;
            });
        }

        $scope.completeTask = function() {
            $http.post($scope.completeTaskUrl).then(function(data) {
                $scope.completeTaskResponse = data.data;
                if(!$scope.completeTaskResponse){ //i.e. null or empty
                    $scope.completeTaskResponse = 'OK';
                }
            });
        }

        $scope.graphQL = function() {

        	// parse raw query via promise
       		new Promise((resolve, reject) => {
       			resolve($scope.gql($scope.graphQLPostBody));
       		}) // execute query 
       		.then(gqlQuery => {
       			return $scope.apolloClient.query({
            	    query: gqlQuery,
            	})
       		}) // handle response
    	    .then(function(data) {
    	    	$scope.graphQLResponse = data.data; 
    	    	$scope.$apply();
    	    }) // handle errors
    	    .catch(function(err) {
    	    	$scope.graphQLResponse = err; 
    	    	$scope.$apply();
    	    });
    	}
        
        $scope.logout = function() {
        	authorization.logout();
        }
    }
]);