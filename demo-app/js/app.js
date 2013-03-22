var app = angular.module('vt-angular-demo', []);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/session', {templateUrl:'partials/sessionForm.html' })
    .when('/session/:sessionID/attendees', {templateUrl:'partials/attendees.html' })
    .when('/session/:sessionID/attendee/:attendeeID/eval', {templateUrl:'partials/evalForm.html' })
    .when('/session/:sessionID/attendee/:attendeeID', {templateUrl:'partials/attendeeForm.html' })
    .when('/session/:sessionID/attendee', {templateUrl:'partials/attendeeForm.html' })
    .otherwise({redirectTo:'/session'});
}]);

function SessionCtrl($scope, $rootScope, $http, $location) {
  $scope.sessions = [];
  $scope.sessionID = '';
  $scope.loadSessions = function () {
    $http.get('feed/sessions.json').success(function (data) {
      $scope.sessions = data;
    }).error(function (data, status, headers, config) {
        console.error('Error :', status);
        $rootScope.showMessage('Erreur', 'status code : ' + status);
      });
  };
  $scope.findSession = function () {
    var session = findObjectInArrayByProperty($scope.sessions, 'sessionID', $scope.sessionID);
    console.log('session :', session);
    if (session === null) {
      console.error('Session introuvable !');
      $rootScope.showMessage('Erreur', 'Session introuvable !');
    } else {
      $location.path('/session/' + $scope.sessionID + '/attendees');
    }
  };
}

function AttendeeCtrl($scope, $rootScope, $http, $routeParams, $location) {
  $scope.loadAttendees = function () {
    var sessionID = $routeParams.sessionID;
    if ($rootScope.attendees === null || $rootScope.sessionID !== sessionID) {
      $rootScope.sessionID = $routeParams.sessionID;
      $http.get('feed/attendees.json').success(function (data) {
        $rootScope.attendees = findObjectsInArrayByProperty(data, 'sessionVTID', sessionID);
        if ($scope.attendees === null) {
          console.error('Participants introuvables !');
          $rootScope.showMessage('Erreur', 'Participants introuvables !');
        }
      }).error(function (data, status, headers, config) {
          console.error('Error :', status);
          $rootScope.showMessage('Erreur', 'status code : ' + status);
        });
    }
  };
  $scope.loadAttendee = function () {
    var attendeeID = $routeParams.attendeeID;
    $scope.attendeeChanged = false;
    if (attendeeID === undefined) {
      $rootScope.attendee = {
        sessionVTID:$rootScope.sessionID
      }
      $scope.changeAttendee();
      return;
    }
    $rootScope.attendee = findObjectInArrayByProperty($rootScope.attendees, 'attendeeVTID', attendeeID);
    if ($rootScope.attendee === null) {
      console.error('Participant introuvable !');
      $rootScope.showMessage('Erreur', 'Participant introuvable !');
      history.back();
    }
  };
  $scope.changeAttendee = function () {
    $scope.attendeeChanged = true;
  };
  $scope.updateAttendee = function (attendee) {
    if ($rootScope.attendee.attendeeVTID === undefined) {
      $rootScope.attendee.attendeeVTID = createUUID();
      if ($rootScope.attendees === null) {
        $rootScope.attendees = [];
      }
      $rootScope.attendees.push($rootScope.attendee);
    }
    if ($scope.attendeeChanged) {
      $rootScope.showMessage('Succès', 'mise à jour effectuée.');
    }
    $location.path('/session/' + $rootScope.attendee.sessionVTID + '/attendee/' + $rootScope.attendee.attendeeVTID + '/eval');
  };
}

function EvalCtrl($scope, $rootScope, $http, $routeParams, $location) {
  $scope.eval = {
    q1:null, q2:null
  };
  $scope.saveEval = function () {
    console.log('evaluation :', $scope.eval);
    $scope.showMessage('Succès', 'Votre évaluation a bien été enregistrée.');
    $location.path('/');
  };
}

app.run(function ($rootScope) {
  $rootScope.attendees = null;
  $rootScope.sessionID = null;
  $rootScope.attendeeID = null;
  $rootScope.attendee = null;
  $rootScope.showMessage = function (strong, text) {
    $rootScope.alertMessage = {strong:strong, text:text};
    $('#alertMessage').show();
    setTimeout(function () {
      $('#alertMessage').hide();
    }, 3000);
  }
});
