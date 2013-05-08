Quadrados = new Meteor.Collection("quadrados");
MoveIntervals = {};

if (Meteor.isClient) {
  Template.quadrados.quadrados = function () {
    return Quadrados.find({});
  };

  Meteor.startup(function () {
    var quadrado = Quadrados.insert({x: Math.random() * 500, y: Math.random() * 500, lastPos: 'down', tiro: null});
    Session.set("quadrado", quadrado);
  });

  $(document).keyup(function (e) {
    var keyCode = e.keyCode || e.which;
    var arrow = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};
    var q = Quadrados.findOne(Session.get("quadrado"));

    if(arrow[keyCode]){
      clearInterval(MoveIntervals[q._id]);
      delete MoveIntervals[q._id];
    }
  });

  $(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    var arrow = {37: 'left', 38: 'up', 39: 'right', 40: 'down', 32: 'space'};
    var q = Quadrados.findOne(Session.get("quadrado"));

    var key = arrow[keyCode];

    if(key && key !== "space" && (key !== q.lastPos || !MoveIntervals[q._id])){
      clearInterval(MoveIntervals[q._id]);
      MoveIntervals[q._id] = setInterval(function(){
        var inc;
        if(key === 'right'){
          inc = {x: 10};
        }if(key === 'left'){
          inc = {x: -10};
        }if(key === 'up'){
          inc = {y: -10};
        }if(key === 'down'){
          inc = {y: 10};
        }
        Quadrados.update(Session.get("quadrado"), {$inc: inc});
      }, 24);
      Quadrados.update(Session.get("quadrado"), {$set: {lastPos: key}});
    }

    if(key === 'space'){
      if(!q.tiro){
        var dir = q.lastPos;
        var tiro = {x: q.x + 20, y: q.y + 20};
        Quadrados.update(Session.get("quadrado"), {$set: {tiro: tiro }});
        var tiroInterval = setInterval(function(){
          var move = {};
          var inc;
          if(dir === 'right'){
            inc = {"tiro.x": 15};
            tiro.x += 15;
          }else if(dir === 'left'){
            inc = {"tiro.x": -15};
            tiro.x -= 15;
          }else if(dir === 'up'){
            inc = {"tiro.y": -15};
            tiro.y -= 15;
          }else if(dir === 'down'){
            inc = {"tiro.y": 15};
            tiro.y += 15;
          }
          Quadrados.update(Session.get("quadrado"), {$inc: inc});
          // quadrados atingidos
          Quadrados.find({
            _id: {$ne: q._id},
            $and: [{
                    x: {$lte: tiro.x + 10},
                    y: {$lte: tiro.y + 10}
                  },
                  {
                    x: {$gte: tiro.x - 40},
                    y: {$gte: tiro.y - 40}
                  }]
          }).forEach(function(quadrado){
            Quadrados.update({_id: quadrado._id}, {$set: {x: 0, y: 0}});
          });
        }, 24);
        setTimeout(function(){
          clearInterval(tiroInterval);
          var q = Quadrados.findOne(Session.get("quadrado"));
          delete q.tiro;
          Quadrados.update({_id: q._id}, q);
        }, 1000);
      }
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("Iniciou server");
    Quadrados.remove({})
  });
}
