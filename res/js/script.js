$(function () {

    toggleProfileMenu();
    loadUserData();
    loadPosts();
    handleLike();
});

function loadUserData() {
    $.ajax({
        url: 'https://private-517bb-wad20postit.apiary-mock.com/users/1',
        method: 'get'
    }).then(function (data) {
        $('.avatar-container img').attr('src', data.avatar);
        $('.avatar-container #user-name').text(data.firstname + " " + data.lastname);
        $('.avatar-container #user-email').text(data.email);
    })
}

function loadPosts() {
    $.ajax({
        url: 'https://private-517bb-wad20postit.apiary-mock.com/posts',
        method: 'get'
    }).then(function (data) {
        for (let post of data) {
            let postContainer = $('<div class="post">');
            let postTitle = $('<div class="post-title">');
            let postActions = $('<div class="post-actions">');
            let author = $('<span class="post-author">');
            let authorInfo = $('<span class="post-author-info">');
            let authorName = $('<small>').text(post.author.firstname + " " + post.author.lastname);
            let authorImage = $('<img>')
                .attr('src', post.author.avatar)
                .attr('alt', post.author.firstname + " " + post.author.lastname);
            let createTime = $('<small>').text(post.createTime);
            let title = $('<h3>').text(post.text);
            let likeButton = $('<button type="button" class="like-button">').text(post.likes);

            authorInfo.append(authorImage);
            authorInfo.append(authorName);
            author.append(authorInfo);
            author.append(createTime);
            postTitle.append(title);
            postActions.append(likeButton);

            postContainer.append(author);

            if (post.media != null) {
                let postMedia = $('<div class="post-image">')
                switch (post.media.type) {
                    case 'image':
                        let img = $('<img>')
                            .attr('src', post.media.url)
                            .attr('alt', post.text);
                        postMedia.append(img);
                        postContainer.append(postMedia);
                        break;
                    case 'video':
                        let video = $('<video controls>');
                        let source =  $('<source type="video/mp4">').attr('src', post.media.url);
                        video.append(source)
                        postMedia.append(video);
                        postContainer.append(postMedia);
                        break;
                }
            }
            postContainer.append(postTitle)
            postContainer.append(postActions)
            $('.main-container').append(postContainer)
        }
    })
}

function toggleProfileMenu() {
    $('.avatar-container img').click(function () {
        $(this).siblings('.drop-down-container').toggle()
    })
}

function handleLike() {
    $(document).on('click', '.like-button', function () {
        $(this).toggleClass('liked')
    })
}