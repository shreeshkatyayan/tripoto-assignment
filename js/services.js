commentApp.service('commentService', function(){
	/**
	  * user_id = id of the comment/reply user
	  * ID = id of the current session user
	  **/
	this.isAuthor = function(user_id, ID){
		if (user_id === ID) {
			return true;
		} else {
			return false;
		}
	}
	/**
	  * comment_array = json array of comments
	  * c_id = comment id to find index of
	  **/
	this.findCommentIndex = function(comment_array, c_id) {
		for (var i = comment_array.length - 1; i >= 0; i--) {
			if (comment_array[i].commentID === c_id) {
				return i;
			}
		}
	}
	/**
	  * comment_array = json array of comments
	  * c_id = comment id of parent comment
	  * r_id = reply id to find index of
	  **/
	this.findReplyIndex = function(comment_array, c_id, r_id) {
		var i = this.findCommentIndex(comment_array, c_id);
		var comment = comment_array[i];
		for (var j = comment.replies.length - 1; j >= 0; j--) {
			if (comment.replies[j].replyID === r_id) {
				return j;
			}
		}
	}
	/**
	  * comment_array = json array of comments
	  * c_id = comment id to check if has replies
	  **/
	this.hasReplies = function(comment_array, c_id) {
		var index = this.findCommentIndex(comment_array, c_id);
		if(comment_array[index].replies.length > 0) {
			return true;
		} else {
			return false;
		}
	}
	/**
	  *
	  **/
	this.isCommentLiked = function(comment_array, c_id) {
		var index = this.findCommentIndex(comment_array, c_id);
		$this = comment_array[index];
		if (!$this.like_status) {
			$this.likes += 1;
			$this.like_status = true;
		} else {
			$this.likes -= 1;
			$this.like_status = false;
		}
	}
	/**
	  *
	  **/
	this.isReplyLiked = function(comment_array, c_id, r_id) {
		if (this.hasReplies(comment_array, c_id)) {
			var index = this.findCommentIndex(comment_array, c_id);
			$this = comment_array[index1];
			index = this.findReplyIndex(comment_array, c_id, r_id);
			$this = $this.replies[index];
			if (!$this.like_status) {
				$this.likes += 1;
				$this.like_status = true;
			} else {
				$this.likes -= 1;
				$this.like_status = false;
			}
		}
	}
});