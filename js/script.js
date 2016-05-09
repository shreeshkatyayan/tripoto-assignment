var commentApp = angular.module('commentApp', []);
//Dummy json for comments and replies
window.comment_test = [{
	"commentID"		:	1,
	"userID"		:	"shreesh",
	"name"			:	"Shreesh Katyayan",
	"avatar_url"	:	"./img/shreesh.jpeg",
	"edit"			:	false,
	"says"			:	"Hi this is first element",
	"likes"			:	21,
	"like_status"	: 	true,
	"replies"		:	[{
		"replyID"		:	1,
		"userID"		:	"obama",
		"name"			:	"Barrack Obama",
		"avatar_url"	:	"./img/obama.jpeg",
		"edit"			:	false,
		"says"			:	"Thank you",
		"likes"			:	5,
		"like_status"	: 	true
	},
	{
		"replyID"		:	2,
		"userID"		:	"shreesh",
		"name"			:	"Shreesh Katyayan",
		"avatar_url"	:	"./img/shreesh.jpeg",
		"edit"			:	false,
		"says"			:	"You are welcome",
		"likes"			:	0,
		"like_status"	: 	false
	}]
},
{
	"commentID"		:	2,
	"userID"		:	"anshu",
	"name"			:	"Anshu Verma",
	"avatar_url"	:	"./img/anshu.jpeg",
	"edit"			:	false,
	"says"			:	"Hi this is second element",
	"likes"			:	11,
	"like_status"	: 	true,
	"replies"		:	[]
}];

window.user = {user_id: prompt("Enter a UserID"), user_name: prompt("Whats your name?"), avatar: "./img/random.jpeg"};

commentApp.controller('commentController', function($scope){
	/*$http.get('post.json').success(function (data){
		$scope.comments = data;
	});*/
	$scope.comments = comment_test;
	$scope.new_comment = "";
	$scope.comments.edit_comment = "";
	$scope.comments.new_reply = "";
	$scope.comments.edit_reply = "";
	//
	$scope.isAuthor = function(user_id){
		if (user_id === user.user_id) {
			return true;
		} else {
			return false;
		}
	}
	
	$scope.findCommentIndex = function(c_id){
		for (var i = $scope.comments.length - 1; i >= 0; i--) {
			if ($scope.comments[i].commentID === c_id) {
				return i;
			}
		}
	}
	
	$scope.findReplyIndex = function(c_id, r_id){
		var i = $scope.findCommentIndex(c_id);
		$this = $scope.comments[i];
		for (var j = $this.replies.length - 1; j >= 0; j--){
			if ($this.replies[j].replyID === r_id) {
				return j;
			}
		}
	}

	$scope.hasReplies = function(c_id){
		var index = $scope.findCommentIndex(c_id);
		if ($scope.comments[index].replies.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	$scope.isReplyLiked = function(c_id, r_id){
		if($scope.hasReplies(c_id)){
			var index1 = $scope.findCommentIndex(c_id);
			$this = $scope.comments[index1];
			var index2 = $scope.findReplyIndex(c_id, r_id);
			$this = $this.replies[index2];
			if (!$this.like_status) {
				$this.likes += 1;
				$this.like_status = true;
			} else {
				$this.likes -= 1;
				$this.like_status = false;
			}
		}
	}
	$scope.insertComment = function(){
		if ($scope.new_comment.length < 1) {
			alert("This comment seems to be blank. Please write something.");
		} else {
			var new_comment_id = $scope.comments[$scope.comments.length - 1].commentID +1;
			var input = {
				"commentID"	: new_comment_id,
				"userID": user.user_id,
				"name": user.user_name,
				"avatar_url": user.avatar,
				"says": $scope.new_comment,
				"likes": 0,
				"like_status": false,
				"replies": [] 
			};
			//Pushes changes to the global comment object
			$scope.comments.push(input);
			$scope.new_comment = '';
		}
	}

	$scope.editComment = function(c_id){
		if ($scope.comments.edit_comment.length < 1) {
			alert("This comment seems to be blank. Please write something.");
		} else {
			var index = $scope.findCommentIndex(c_id);
			$this = $scope.comments[index];
			$this["says"] = $scope.comments.edit_comment;
			$this.edit = false;
		}
	}
	
	$scope.deleteComment = function(c_id){
		var index = $scope.findCommentIndex(c_id);
		$scope.comments.splice(index, 1);
	}

	$scope.insertReply = function(c_id){
		if ($scope.comments.new_reply < 1) {
			alert("This reply seems to be blank. Please write something");
		} else {
			var index = $scope.findCommentIndex(c_id);
			var new_reply_id;
			$this = $scope.comments[index];
			if ($scope.hasReplies(c_id)) {
				new_reply_id = $this.replies[$this.replies.length - 1].replyID + 1;
			} else {
				new_reply_id = 1;
			}
			var input = {
				"replyID"	: new_reply_id,
				"userID": user.user_id,
				"name": user.user_name,
				"avatar_url": user.avatar,
				"says": $scope.comments.new_reply,
				"likes": 0,
				"like_status": false,
			};
			$this.replies.push(input);
			$this.add_reply = false;
			$scope.comments.new_reply = '';
		}
	}
	
	$scope.editReply = function(c_id, r_id){
		if ($scope.comments.edit_reply.length < 1) {
			alert("This reply seems to be blank. Please write something.")
		} else {
			if($scope.hasReplies(c_id)) {
				var index1 = $scope.findCommentIndex(c_id);
				$this = $scope.comments[index1];
				var index2 = $scope.findReplyIndex(c_id, r_id);
				$this = $this.replies[index2];
				$this["says"] = $scope.comments.edit_reply;
				$this.edit = false;
			}
		}
	}

	$scope.deleteReply = function(c_id, r_id){
		if ($scope.hasReplies(c_id)) {
			var index = $scope.findCommentIndex(c_id);
			$this = $scope.comments[index];
			index = $scope.findReplyIndex(c_id, r_id);
			$this.replies.splice(index, 1);
		}
	}

	$scope.isCommentLiked = function(c_id){
		var index = $scope.findCommentIndex(c_id);
		$this = $scope.comments[index];
		if(!$this.like_status){
			$this.likes += 1;
			$this.like_status = true;
		} else {
			$this.likes -= 1;
			$this.like_status = false;
		}
	}
	
});