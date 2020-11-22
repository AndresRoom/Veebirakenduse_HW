$(function () {

    toggleProfileMenu();
    loadUserData();
    loadProfiles();
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

function loadProfiles() {
    $.ajax({
        url: 'https://private-517bb-wad20postit.apiary-mock.com/profiles',
        method: 'get'
    }).then(function (data) {
        for (let profile of data) {

            let profileContainer = $('<div class="profile">');
            let name = $('<h2>').text(profile.firstname + " " + profile.lastname);
            let image = $('<img>')
                .attr('src', profile.avatar)
                .attr('alt', profile.firstname + " " + profile.lastname);
            let button = $('<button class="follow-button">').text('Follow');

            profileContainer.append(image)
            profileContainer.append(name);
            profileContainer.append(button)

            $('.main-container').append(profileContainer)
        }
    })
}

function toggleProfileMenu() {
    $('.avatar-container img').click(function () {
        $(this).siblings('.drop-down-container').toggle()
    })
}

function handleLike() {
    $(document).on('click', '.follow-button', function () {
        if ($(this).hasClass('followed')) {
            $(this).removeClass('followed')
            $(this).text('Follow')
        } else {
            $(this).addClass('followed')
            $(this).text('Followed')
        }
    })
}