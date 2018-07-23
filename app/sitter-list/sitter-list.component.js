'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('sitterList').
  component('sitterList', {
    templateUrl: 'sitter-list/sitter-list.template.html',
    controller:
      function SitterListController($http) {
        //this.sitters = Sitter.query();
        var self = this;
        $http.get('reviews.csv').then(function(response) {
          self.allStays = response.data;
          self.stayReviews = self.allStays.split("\n");
          self.sitters = [];
          for (var i=1; i<self.stayReviews.length-1; i++) {
            // 0: rating
            // 1: sitter_image
            // 2: end_date
            // 3: text
            // 4: owner_image
            // 5: dogs
            // 6: sitter
            // 7: owner
            // 8: start_date
            // 9: sitter_phone_number
            // 10: sitter_email
            // 11: owner_phone_number
            // 12: owner_email
            self.currentSitter = self.stayReviews[i].split(',');
            self.currentSitterName = self.currentSitter[6];
            self.sitterIndex = self.indexOfSitter(self.sitters, self.currentSitterName);
            if (self.sitterIndex < 0) {
              self.firstRating = Number(self.currentSitter[0]);
              self.sitterObj = {
                sitterName: self.currentSitterName,
                sitterRatings: [self.firstRating],
                sitterImage: self.currentSitter[1],
                ratingsScore: self.firstRating,
                overallRank: self.calculateOverallRank(self.currentSitterName, [self.firstRating])
              };
              self.sitters.push(self.sitterObj);
              //self.sitterInList = self.sitters[self.sitters.length-1];
              //self.sitterInList.ratingsScore = self.calculateRatingsScore(self.sitterInList.sitterRatings);
              //self.sitterInList.overallRank = self.calculateOverallRank(self.sitterInList.sitterName, self.sitterInList.sitterRatings);
            } else {
              self.sitterInList = self.sitters[self.sitterIndex];
              self.sitterInList.sitterRatings.push(Number(self.currentSitter[0]));
              self.sitterInList.ratingsScore = self.calculateRatingsScore(self.sitterInList.sitterRatings);
              self.sitterInList.overallRank = self.calculateOverallRank(self.sitterInList.sitterName, self.sitterInList.sitterRatings);
            }

            // if (!Object.keys(self.sitters).includes(self.currentSitter[6])) {
            //   // add the entire sitter to sitters object
            //
            // } else {
            //   // add the rating score to the ratings list of that sitter
            // }
          }
          //self.sitters = response.data;
          // for (var i=0; i<self.sitters.length; i++) {
          //   var sitter = self.sitters[i];
          //   sitter.ranking = self.calculateRatingsScore(sitter.ratings);
          //   sitter.overallRank = self.calculateOverallRank(sitter.name, sitter.ratings);
          // }
        });
        //self.sitters = this.sittersList;
        // var sitterList = this.sitters;
        // for (var i=0; i<sitterList.length; i++) {
        //   var sitter = sitterList[i];
        //   sitter.ranking = this.calculateRatingsScore(sitter.ratings);
        // }
        // sitterList.$promise.then(function() {
        //   //var sitter = sitterList[0];
        //   for (var i=0; i<sitterList.length; i++) {
        //     var sitter = sitterList[i];
        //     sitter.ranking = this.calculateRatingsScore(sitter.ratings);
        //   }
        //   //sitter.ranking = 3;
        //   //sitter.$save();
        // });
        // this.num = 0;
        // this.$onInit = function() {
        //   for (sitter in this.sitters) {
        //     num++;
        //   }
        // }

        this.orderProp = '-overallRank';

        this.minRankingToShow = 0;

        //this.newRating = "";

        this.addRatingToSitter = function addRatingToSitter(rating, sitter) {
          if (rating <=5 && rating >=0) {
            sitter.sitterRatings.push(rating);
            sitter.ratingsScore = this.calculateRatingsScore(sitter.sitterRatings);
            sitter.overallRank = this.calculateOverallRank(sitter.sitterName, sitter.sitterRatings);
            console.log(rating);
            //console.log(document.getElementById("rating"));
            //document.getElementById("rating").reset();
            sitter.newRating = "";
          }
        }

        // this.openDialog = function(event) {
        //   $mdDialog.show({
        //     controllerAs: '$ctrl',
        //     //controllerAs: 'questList',
        //     templateUrl: 'dialog.tmpl.html',
        //     parent: angular.element(document.body),
        //     targetEvent: event,
        //     clickOutsideToClose:true,
        //     //locals: {parent: $scope},
        //   })
        //  .then(function(answer) {
        //    console.log(answer);
            // questList.allsQ.push({
            //    titolo: questList.titolo ,
            //    capitolo: questList.capitolo,
            //    descrizione: questList.descrizione,
            //    importo: questList.importo,
            //    data: questList.data
            // });
            // questList.titolo = '';
            // questList.capitolo = '';
            // questList.descrizione = '';
            // questList.importo = '';
            // questList.data = '';
            // console.log(questList.allsQ);
            // console.log(questList.allsQ.length);
    //     });
    // };

  //       this.showReviewDialog = function(ev, sitter) {
  //         var confirm = $mdDialog.prompt()
  //           .title('What would you name your dog?')
  //           .textContent('Bowser is a common name.')
  //           .placeholder('Dog name')
  //           .ariaLabel('Dog name')
  //           .initialValue('Buddy')
  //           .targetEvent(ev)
  //           .required(true)
  //           .ok('Okay!')
  //           .cancel('I\'m a cat person');
  //         $mdDialog.show(confirm)
  //           .then(function(result, sitter) {
  //             //$scope.status = 'You decided to name your dog ' + result + '.';
  //             console.log("hello");
  //           }, function() {
  //           //$scope.status = 'You didn\'t name your dog.';
  //           });
  //       };
  //
  //       $scope.showPrompt = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   var confirm = $mdDialog.prompt()
  //     .title('What would you name your dog?')
  //     .textContent('Bowser is a common name.')
  //     .placeholder('Dog name')
  //     .ariaLabel('Dog name')
  //     .initialValue('Buddy')
  //     .targetEvent(ev)
  //     .required(true)
  //     .ok('Okay!')
  //     .cancel('I\'m a cat person');
  //
  //   $mdDialog.show(confirm).then(function(result) {
  //     $scope.status = 'You decided to name your dog ' + result + '.';
  //   }, function() {
  //     $scope.status = 'You didn\'t name your dog.';
  //   });
  // };

        // this.showPrerenderedDialog = function(ev) {
        //   $mdDialog.show({
        //     contentElement: '#myDialog',
        //     parent: angular.element(document.body),
        //     targetEvent: ev,
        //     clickOutsideToClose: true
        //   })
        //   .then(function(answer) {
        //     //$scope.status = 'You said the information was "' + answer + '".';
        //     console.log(answer);
        //   });
        // };
        //
        // this.cancelDialog = function cancelDialog() {
        //   $mdDialog.cancel();
        // }
        //
        // this.hideDialog = function hideDialog() {
        //   $mdDialog.hide();
        // }
        //
        // this.answer = function answer(answer) {
        //   $mdDialog.hide(answer);
        // }

        // function DialogController($mdDialog) {
        //   this.hide = function() {
        //     $mdDialog.hide();
        //   };
        //
        //   this.cancel = function() {
        //     $mdDialog.cancel();
        //   };
        //
        //   this.answer = function(answer) {
        //     $mdDialog.hide(answer);
        //   };
        // }

        this.testAddSitter = function testAddSitter(name) {
          console.log("pushed a sitter?");
          this.sitterObj = {
            sitterName: name,
            sitterRatings: [5.0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            sitterImage: "https://images.dog.ceo/breeds/dalmatian/cooper2.jpg",
            ratingsScore: 5,
            overallRank: self.calculateOverallRank("Olivia Seraphina Gordon", [5.0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5])
          };
          this.sitters.push(this.sitterObj);
        }

        this.indexOfSitter = function indexOfSitter(listOfSitters, name) {
          this.isSameSitter = function isSameSitter(element) {
            return element.sitterName == name;
          }
          return listOfSitters.findIndex(this.isSameSitter);
        }

        this.shouldShow = function shouldShow(sitterStayRanking) {
          return sitterStayRanking >= this.minRankingToShow;
        }

        this.calculateOverallRank = function calculateOverallRank(sitterName, stayRatingsList) {
          var sitterScore = this.calculateSitterScore(sitterName);
          //var sitterScore = 2.5;
          var ratingsScore = this.calculateRatingsScore(stayRatingsList);
          var stays = stayRatingsList.length;
          if (stays >= 10) {
            return ratingsScore;
          }
          return this.roundTwoDecimalPlaces((ratingsScore * stays + sitterScore * (10-stays))/10);
        }

        this.calculateRatingsScore = function calculateRatingsScore(stayRatingsList) {
          var stays = stayRatingsList.length;
          if (stays == 0) {
            return 0;
          }
          var ratingCount = 0;
          for (var i=0; i<stays; i++) {
            ratingCount += stayRatingsList[i];
          }
          return ratingCount/stays;
        }

        this.calculateSitterScore = function calculateSitterScore(sitterName) {
          var letters = this.distinctLetters(sitterName);
          var fraction = letters/26;
          return fraction*5;
        };

        this.distinctLetters = function distinctLetters(sitterName) {
          var name = this.simplifyString(sitterName);
          var letters = "";
          for (var i = 0; i<name.length; i++) {
            var letter = name.charAt(i);
            if (!letters.includes(letter)) {
              letters += letter;
            }
          }
          return letters.length;
        };

        this.simplifyString = function simplifyString(word) {
          word = word.toLowerCase();
          var simpleString = "";
          for (var i=0; i<word.length; i++) {
            var letter = word.charAt(i);
            if (this.isLetter(letter)) {
              simpleString += letter;
            }
          }
          return simpleString;
        }

        this.roundTwoDecimalPlaces = function roundTwoDecimalPlaces(rating) {
          rating *= 100;
          rating = Math.round(rating);
          rating /=100;
          return rating;
        }

        this.isLetter = function isLetter(letter) {
          return !!letter.match(/[a-z]/i);
        }
      }
  });
