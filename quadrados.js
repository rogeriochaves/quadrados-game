Quadrados = new Meteor.Collection("quadrados");

if (Meteor.isClient) {
  Template.quadrados.quadrados = function () {
    return Quadrados.find({});
  };

  Meteor.startup(function () {
    var quadrado = Quadrados.insert({x: Math.random() * 1000, y: Math.random() * 500});
    Session.set("quadrado", quadrado);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Quadrados.remove({})
  });
}
