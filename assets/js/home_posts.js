{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                    console.log(data);
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    };

    //for new post DOM
    let newPostDOM = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        </p> 
            <a id="delete-post-button" href="/posts/delete/${post._id}">Delete</a>
    </li>
    <div class="post-comments">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type your comment here..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
        <div class="post-comments-list">
            <div id="post-comments-${post._id}">
            </div>
        </div>
    </div>
    <hr>`);
    }

    createPost();
}