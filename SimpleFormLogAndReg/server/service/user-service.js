const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const mailService = require('./mail-service');
const tokenService = require('../service/token-service');
const uuid = require('uuid');
const UserDto = require('../dtos/user-dto');

class UserService {
    async registration(email, password){
        const candidate = await UserModel.findOne({email});
        console.log(candidate);
        if( candidate ){
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        // Хэширование пароля
        const hashPassword = await bcrypt.hash(password, 3);
        // Генерация ссылки
        const activationLink = uuid.v4(); 
        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user); 
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens, 
            user: userDto
        }
    }

    async activate(activationLink){
        const user = await UserModel.findOne({activationLink});
        if(!user){
            throw new Error('Некорректная ссылка для активации :(');
        }

        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();