const ApiError = require("../exceptoins/api-error");
const roleModel = require("../models/role-model");
const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const tokenService = require('../service/token-service');



class AdminService {
    async login(email, password){
        const admin = await UserModel.findOne({email: email});
        if(!admin){ 
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }

        let hasRole = false; 
        admin.roles.forEach(role => {
            if(["ADMIN", "MODER"].includes(role)){
                hasRole = true;
            }
        });

        if(!hasRole){
            throw ApiError.BadRequest('Нет доступа');
        }
        const isPassEquals = await bcrypt.compare(password, admin.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        
        const userDto = new UserDto(admin);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

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

    async getProductItem(){
        
    }

    
}

module.exports = new AdminService();