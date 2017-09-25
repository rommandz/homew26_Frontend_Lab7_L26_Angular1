const studentModule = angular.module('studentsList', ['ui.router']);

studentModule.controller('Ctrl', ['$scope', function($scope) {
    $scope.students = [
        {
            name: 'Roman',
            surname: 'Mahotskiy',
            photo: 'http://flipbit.co.uk/content/images/blog/build-avatar.jpg',
            id: 0,
            date: '10.10.1990',
            phone: 333333
        },

        {
            name: 'Pavlo',
            surname: 'Hibey',
            photo: 'https://mylittlepony.hasbro.com/images/CharacterPageAvatar_MLP_twilightsparkle.png',
            id: 1,
            date: '11.11.1991',
            phone: 555555
        },

        {
            name: 'Volodymyr',
            surname: 'Stakhov',
            photo: 'https://mylittlepony.hasbro.com/images/pick_EG_pinkiepie.png',
            id: 2,
            date: '12.12.1992',
            phone: 777777
        }
    ];
}]);



studentModule.config(function ($stateProvider) {
    const parentRoute = {
        name: 'parentRoute',
        url: '/',
        template: `<div class="students">
                    <students-directive  ng-repeat="el in students" name="el.name" surname="el.surname" photo="el.photo" id="el.id"></students-directive>
                </div>`,
        controller: 'Ctrl',
    }

    const childRoute = {
        name: 'profile',
        url: '/profile/:id',
        template: function ($stateParams) {
            return `<div class="students">
                        <div>
                            <img src="{{students[${$stateParams.id}].photo}}">
                            <div>{{students[${$stateParams.id}].name}} {{students[${$stateParams.id}].surname}}</div>
                            <div>Birthday: {{students[${$stateParams.id}].date}}</div>
                            <div>Phone: {{students[${$stateParams.id}].phone}}</div>
                        </div>
                    </div>`
        },
        controller: 'Ctrl',
    }

    $stateProvider.state(parentRoute);
    $stateProvider.state(childRoute);
});

studentModule.directive('studentsDirective', function() {
  const directiveDefinitionObject = {
    priority: 0,
    template: `<div>
                <img class="clickable" src="{{photo}}" alt="image" ui-sref="profile({ id: {{id}} })">
                <div>
                  <input ng-show="isEditing" ng-model="name"><br ng-show="isEditing">
                  <input ng-show="isEditing" ng-model="surname">
                </div>
                <div ng-show="!isEditing">{{name}} {{surname}}</div>
                <button ng-show="!isEditing" ng-click="isEditing=true">Change</button>
                <button ng-show="isEditing" ng-click="isEditing=false">Save</button>
            </div>`,
    transclude: false,
    restrict: 'E',
    scope: {name:'=', surname:'=', photo:'=', id:'='}
  };

  return directiveDefinitionObject;
});
