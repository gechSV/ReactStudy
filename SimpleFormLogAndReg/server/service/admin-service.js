const ApiError = require("../exceptoins/api-error");
const roleModel = require("../models/role-model");
const UserModel = require('../models/user-model');

class AdminService {

    async newRole(roleName){
        const candidateRole = await roleModel.findOne({value: roleName});
        console.log('candidateRole', candidateRole)
        if(candidateRole){
            throw ApiError.BadRequest(`Роль, которую вы ходите создать уже существует`);
        }

        const newRole = await roleModel.create({value: roleName});
        return newRole;
    }

    async addUserRole(email, role){
        const user = await UserModel.findOne({email: email});
        if(!user){
            throw ApiError.BadRequest(`Пользователь: ${email} не найден :(`);
        } 

        const roleCandidate = await roleModel.findOne({value: role});
        if(!roleCandidate){
            throw ApiError.BadRequest(`Роли ${role} не существует`);
        } 

        let hasRole = false;

        user.roles.forEach(r => {
            if(r === role){
                hasRole = true;
            }
        })

        if(hasRole){
            throw ApiError.BadRequest(`Пользователь уже имеет роль: ${role}`);
        }

        const userUpd = await UserModel.updateOne(
            {_id: user._id}, 
            {$push: {roles: roleCandidate.value}}
        );

        console.log(userUpd)

        return userUpd;
    }

    async delUserRole(email, role){
        const user = await UserModel.findOne({email: email})
        if(!user){
            throw ApiError.BadRequest(`Пользователь: ${email} не найден :(`);
        }

        let hasRole = false;
        user.roles.forEach(r => {
            if(r === role){
                hasRole = true;
            }
        })

        if(!hasRole){
            throw ApiError.BadRequest(`Пользователь не имеет данной роли.`);
        }

        const userUpd = await UserModel.updateOne(
            {_id: user._id}, 
            {$pull: {roles: role}}
        );

        console.log(userUpd)

        return userUpd;
    }


    
}

module.exports = new AdminService();