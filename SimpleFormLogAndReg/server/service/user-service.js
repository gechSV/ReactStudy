const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const mailService = require('./mail-service');
const tokenService = require('../service/token-service');
const uuid = require('uuid');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptoins/api-error')

class UserService {
    async registration(email, password){
        const candidate = await UserModel.findOne({email});
        console.log(candidate);
        if( candidate ){
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        // Хэширование пароля
        const hashPassword = await bcrypt.hash(password, 3);
        // Генерация ссылки
        const activationLink = uuid.v4(); 
        const user = await UserModel.create({email, password: hashPassword, activationLink});
        // Отправка сообщения на майл
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

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
            throw ApiError.BadRequest('Некорректная ссылка для активации :(');
        }

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne( {email} );
        if(!user){ 
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, users: userDto}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
}

module.exports = new UserService();