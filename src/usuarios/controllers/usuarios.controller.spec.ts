import { Role } from './../../auth/model/role.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../service/usuarios.service';
import { User } from '../model/user.model';

const UserList: User[] = [
    new User({ name: 'Admin', email: 'admin@gmail.com', password: 'Admin123@', role: Role.ADMIN }),
    new User({ name: 'User', email: 'user@gmail.com', password: 'User123@', role: Role.USER }),
    new User({ name: 'Lucas', email: 'lucas@gmail.com', password: 'Lucas123@', role: Role.ADMIN })
]
const user = new User({
    name: 'Admin', email: 'admin@gmail.com', password: 'Admin123@', role: Role.ADMIN
})

describe('TesteController', () => {
    let usuarioscontroller: UsuariosController;
    let usuariosService: UsuariosService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuariosController],
            providers: [{
                provide: UsuariosService,
                useValue: {
                    create: jest.fn().mockResolvedValue(user),
                    findAll: jest.fn().mockResolvedValue(UserList),
                    findByEmail: jest.fn().mockResolvedValue(user),
                    update: jest.fn().mockResolvedValue(user),
                    remove: jest.fn().mockResolvedValue(true),
                }
            }],
        }).compile();

        usuarioscontroller = module.get<UsuariosController>(UsuariosController);
        usuariosService = module.get<UsuariosService>(UsuariosService);

    });

    it('should be defined', () => {
        expect(usuarioscontroller).toBeDefined();
        expect(usuariosService).toBeDefined();
    });
    describe('findAll', () => {
        it('deve retornar uma lista de usuários com sucesso', async () => {
            const result = await usuarioscontroller.findAll();

            expect(result).toEqual(UserList);
            expect(typeof result).toEqual('object');
            expect(usuariosService.findAll).toHaveBeenCalledTimes(1)
        });
        it('deve lançar uma exeção', () => {
            jest.spyOn(usuariosService, 'findAll').mockRejectedValueOnce(new Error());

            expect(usuarioscontroller.findAll()).rejects.toThrowError();
        });
    });
    describe('create', () => {
        it('deve retornar que usuario foi criado', async () => {
            const body = {
                name: 'Admin', email: 'admin@gmail.com', password: 'Admin123@', role: Role.ADMIN
            }
            const result = await usuarioscontroller.create(body);
            expect(result).toEqual(user)
            expect(usuariosService.create).toHaveBeenCalledTimes(1)
            expect(usuariosService.create).toHaveBeenCalledWith(body)
        });
        it('deve lançar uma exeção', () => {
            const body = {
                name: 'Admin', email: 'admin@gmail.com', password: 'Admin123@', role: Role.ADMIN
            }
            jest.spyOn(usuariosService, 'create').mockRejectedValueOnce(new Error());

            expect(usuarioscontroller.create(body)).rejects.toThrowError();
        })
    });
    describe('findByEmail', () => {
        it('deve retornar infomações do usuário', async () => {
            const email = 'admin@gmail.com';
            const result = await usuarioscontroller.findOne(email)
            expect(result).toEqual(user)
            expect(usuariosService.findByEmail).toHaveBeenCalledTimes(1)
        });
        it('deve lançar uma exeção',()=>{
            const email = 'admin@gmail.com';
            jest.spyOn(usuariosService, 'findByEmail').mockRejectedValueOnce(new Error());

            expect(usuarioscontroller.findOne(email)).rejects.toThrowError();
        });
    });
    describe('update',()=>{
        it('deve atualizar infomações do usuário', async()=>{
            const body = {
                name: 'Admin', email: 'admin1@gmail.com', password: 'Admin123@', role: Role.ADMIN
            }
            const id = '23sdsd';
            const result = await usuarioscontroller.update(id,body)
            expect(result).toEqual(user)
            expect(usuariosService.update).toHaveBeenCalledTimes(1)
        });
        it('deve lançar uma exeção',()=>{
            const body = {
                name: 'Admin', email: 'admin1@gmail.com', password: 'Admin123@', role: Role.ADMIN
            }
            const id = '23sdsd';
            jest.spyOn(usuariosService, 'update').mockRejectedValueOnce(new Error());

            expect(usuarioscontroller.update(id,body)).rejects.toThrowError();
        })
    });
    describe('remove',()=>{
        it('deve deletar um usuario',async()=>{
            const id = '23sdsd';
            const result = await usuarioscontroller.remove(id)
            expect(result).toEqual(true)
            expect(usuariosService.remove).toHaveBeenCalledTimes(1)
        });
        it('deve lançar uma exeção',()=>{
            const id = '23sdsd';
            jest.spyOn(usuariosService, 'remove').mockRejectedValueOnce(new Error());
            expect(usuarioscontroller.remove(id)).rejects.toThrowError()
        })
    });
});