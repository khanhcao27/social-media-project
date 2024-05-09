$(document).ready(function() {
    // Handle form submission
    $('#postForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        var postContent = $('#postContent').val(); // Get post content from textarea
        if (postContent.trim() !== '') { // Check if post content is not empty
            // Create a new post element
            var postElement = $('<div class="post"><p>' + postContent + '</p><form class="commentForm"><textarea class="form-control commentContent" rows="2" placeholder="Write a comment..."></textarea><button type="submit" class="btn btn-secondary">Comment</button></form><div class="comments"></div></div>');
            // Append the post element to the post container
            $('#postContainer').prepend(postElement);
            // Clear the textarea
            $('#postContent').val('');
        }
    });

    // Handle comment submission
    $(document).on('submit', '.commentForm', function(event) {
        event.preventDefault(); // Prevent default form submission
        var commentContent = $(this).find('.commentContent').val(); // Get comment content from textarea
        if (commentContent.trim() !== '') { // Check if comment content is not empty
            // Create a new comment element
            var commentElement = $('<div class="comment"><p>' + commentContent + '</p></div>');
            // Append the comment element to the comments container
            $(this).parent().find('.comments').append(commentElement);
            // Clear the textarea
            $(this).find('.commentContent').val('');
        }
    });
});
