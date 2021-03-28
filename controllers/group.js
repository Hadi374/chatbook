const createGroup = (title) => {
    return new Promise((resolve, reject) => {
        // TODO: create receiver and after that create new group with same id s.
    })
}

const editGroup = (group_id, title, profile, cover) => {
    return new Promise((resolve, reject) => {
        
    })
}

const deleteGroup = (group_id) => {
    return new Promise((resolve, reject) => {

    })
}

const getGroup = (group_id) => {
    return new Promise((resolve, reject) => {
        // TODO: if(group_id is null) { return some random groups (for now) }

    })
}

const getMembers = (group_id) => {
    return new Promise((resolve, reject) => {
        // return all members of group with some detail 
    })
}

const promoteToAdmin = (group_id, user_id) => {
    return new Promise((resolve, reject) => {

        // TODO: promote the user in this group to admin.
    })
}

const demoteAdmin = (group_id, user_id) => {
    return new Promise((resolve, reject) => {
        // demote admin to normal user for this group.

    })
}

const joinGroup = (group_id) => {
    return new Promise((resolve, reject) => {
        // TODO: add logged in user to members of the group

    })
}

const leaveGroup = (group_id) => {
    return new Promise((resolve, reject) => {
        // TODO: remove logged in user from group

    })
}

const removeMember = (group_id, user_id) => {
    return new Promise((resolve, reject) => {
        // TODO: remove a user with id=user_id from members of group.
        // uses for kicking a member.
    })
}

module.exports = {
    createGroup,
    editGroup,
    deleteGroup,
    getGroup,
    getMembers,
    promoteToAdmin,
    demoteAdmin,
    joinGroup,
    leaveGroup,
    removeMember,
}