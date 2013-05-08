Quadrados = new Meteor.Collection("quadrados");

if (Meteor.isClient) {
  Template.quadrados.quadrados = function () {
    return Quadrados.find({});
  };

  Meteor.startup(function () {
    var quadrado = Quadrados.insert({x: Math.random() * 500, y: Math.random() * 500});
    Session.set("quadrado", quadrado);
  });

  $(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    var arrow = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};

    var key = arrow[keyCode];
    if(key === 'right'){
      Quadrados.update(Session.get("quadrado"), {$inc: {x: 5}});
    }else if(key === 'left'){
      Quadrados.update(Session.get("quadrado"), {$inc: {x: -5}});
    }else if(key === 'up'){
      Quadrados.update(Session.get("quadrado"), {$inc: {y: -5}});
    }else if(key === 'down'){
      Quadrados.update(Session.get("quadrado"), {$inc: {y: 5}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Quadrados.remove({})
  });
}
