/* exported Debris */
var Debris = (function(){
  'use strict';

  function Debris(game){
    this.debrisImgIndex = Math.floor((Math.random() * 9));
  }

  Debris.prototype.preload = function(game){
    game.load.image('debris1', 'assets/images/asteroid1.jpg');
    game.load.image('debris2', 'assets/images/asteroid2.jpg');
    game.load.image('debris3', 'assets/images/asteroid3.jpg');
    game.load.image('debris4', 'assets/images/asteroid4.jpg');
    game.load.image('debris5', 'assets/images/asteroid5.jpg');
    game.load.image('debris6', 'assets/images/asteroid6.jpg');
  };

  Debris.prototype.create = function(game){
    this.group = game.add.group(); // Create a group  
    this.group.enableBody = true;  // Add physics to the group  


    //create 20 random images for the debris lines
    for(var i = 0; i < 20; i++){
      //params: x, y, imageID, frame, exists(t or f)
      this.group.create(0, 0, randomImage(), 0, false);
    }
  };

  Debris.prototype.addOneDebris = function(x, y) {  
      // Get the first dead pipe of our group
      var debris = this.group.getFirstDead();

      //manually set size of the debris
      debris.width = 45;
      debris.height = 45;


      //change the hitboxes for each piece of debris
      debris.body.width = 45;
      debris.body.height = 45;

      // Set the new position of the debris piece
      debris.reset(x, y);

      // Add velocity to the pipe to make it move left
      debris.body.velocity.y = -180; 

      // Kill the pipe when it's no longer visible 
      debris.checkWorldBounds = true;
      debris.outOfBoundsKill = true;

  };


  Debris.prototype.addRowOfDebris = function() { 
    // Pick where the hole will be
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    for (var i = 0; i < 6; i++){
        if (i != hole && i != hole + 1){
          this.addOneDebris(i * 60 + 10, 900); 
        }    
    }
  };

  function randomImage(){
    var images = ['debris1', 'debris2', 'debris3', 'debris4', 'debris5', 'debris6']
    return images[Math.floor((Math.random() * 6))];
  }


  return Debris;

})();