Meteor.methods({
	changeName: function(_id, newName){
		Meteor.users.update({ _id: _id }, {$set: { username: newName }});
	},
	changeEmail: function(_id, newName){
		Meteor.users.update({ _id: _id }, {$set: { 'emails':{address: newName} }});
	},
	changestatus: function(_id, newName){
		Meteor.users.update({ _id: _id }, {$set: { 'profile.status': newName }});
	}
})